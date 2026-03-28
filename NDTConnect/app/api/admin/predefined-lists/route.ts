
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import PredefinedList from '../../../../lib/models/PredefinedList';

const listConfigurations = [
  { id: "clientNdtServices", name: "NDT Service Types (Client Request & AI)", itemTypeName: "Service Type", placeholder: "e.g., Neutron Radiography" },
  { id: "providerNdtServices", name: "NDT Service Types (Provider Profile)", itemTypeName: "Service Type", placeholder: "e.g., Guided Wave Testing" },
  { id: "serviceUnits", name: "Service Units", itemTypeName: "Service Unit", placeholder: "e.g., per item" },
  { id: "companyCertifications", name: "Company Certifications", itemTypeName: "Certification", placeholder: "e.g., API Monogram" },
  { id: "personnelQualificationBodies", name: "Personnel Qualification Bodies", itemTypeName: "Body", placeholder: "e.g., ACCP" },
  { id: "personnelQualificationLevels", name: "Personnel Qualification Levels", itemTypeName: "Level", placeholder: "e.g., Trainee" },
  { id: "currency", name: "Currency", itemTypeName: "Currency", placeholder: "e.g., USD" },
];

const BUILT_IN_DEFAULTS: Record<string, string[]> = {
  clientNdtServices: ["Ultrasonic Testing (UT)", "Magnetic Particle Testing (MT)", "Liquid Penetrant Testing (PT)", "Radiographic Testing (RT)", "Eddy Current Testing (ET)", "Visual Testing (VT)"],
  providerNdtServices: ["Radiographic Testing", "Ultrasonic Testing", "Magnetic Particle Testing", "Liquid Penetrant Testing", "Visual Testing", "Eddy Current Testing", "Leak Testing", "Acoustic Emission"],
  serviceUnits: ["per hour", "per day", "per project", "per item", "per foot", "per weld"],
  companyCertifications: [
    "API Q1",
    "AS9100",
    "IACS - American Bureau of Shipping (ABS)",
    "IACS - Bureau Veritas (BV)",
    "IACS - China Classification Society (CCS)",
    "IACS - Croatian Register of Shipping (CRS)",
    "IACS - DNV",
    "IACS - Indian Register of Shipping (IRS)",
    "IACS - Korean Register of Shipping (KR)",
    "IACS - Lloyd's Register (LR)",
    "IACS - Nippon Kaiji Kyokai (ClassNK)",
    "IACS - Polski Rejestr Statków (PRS)",
    "IACS - RINA Services (RINA)",
    "IACS - Russian Maritime Register of Shipping (RS)",
    "ISO 9001",
    "ISO 14001",
    "ISO 45001",
    "ISO/IEC 17020",
    "ISO/IEC 17024",
    "ISO/IEC 17025",
    "Nadcap",
    "NAS 410",
  ],
  personnelQualificationBodies: ["ASNT", "PCN", "ISO 9712", "CSWIP", "ACCP", "NAS 410"],
  personnelQualificationLevels: ["Level I", "Level II", "Level III", "Technician", "Trainee"],
  currency: ["USD", "EUR", "GBP", "INR", "AUD", "CAD", "JPY", "CNY", "CHF", "NZD", "SGD", "HKD", "SEK", "KRW", "BRL", "MXN", "RUB", "ZAR", "TRY", "AED", "SAR", "MYR", "THB", "IDR", "PHP", "VND", "PLN", "DKK", "NOK", "HUF", "CZK", "ILS", "CLP", "ARS", "COP", "EGP", "NGN", "PKR", "BDT", "KES", "PEN", "UAH", "RON", "KWD", "QAR", "OMR", "BHD", "JOD", "ISK", "CRC", "DOP", "UYU", "GTQ", "PYG", "BOB", "HNL", "NIO", "SVC", "PAB", "BZD", "TTD", "BND", "FJD", "XPF", "XAF", "XOF", "MAD", "DZD", "TND", "LYD", "GHS", "UGX", "TZS", "ZMW", "ETB", "GNF", "RSD", "BGN", "HRK", "ALL", "MKD", "GEL", "AMD", "AZN", "BYN", "MDL", "KZT", "KGS", "TJS", "TMT", "UZS", "LAK", "KHR", "MMK", "MNT", "NPR", "LKR", "MVR", "AFN", "IQD", "IRR", "SYP", "YER", "SDG", "SSP", "CDF", "RWF", "BIF", "DJF", "ERN", "SZL", "LSL", "NAD", "MZN", "SCR", "MUR", "GMD", "WST", "STN", "ANG", "AWG", "BBD", "BMD", "KYD", "CUP", "GIP", "SHP", "JMD", "LRD", "SBD", "SOS", "SRD", "TOP", "VUV", "XCD", "ZWL"]
};


export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const lists = await PredefinedList.find({});
    
    if (lists.length === 0) {
      const seedPromises = listConfigurations.map(async (config) => {
        const newList = new PredefinedList({
          _id: config.id,
          name: config.name,
          itemTypeName: config.itemTypeName,
          placeholder: config.placeholder,
          items: BUILT_IN_DEFAULTS[config.id] || [],
          lastUpdated: new Date()
        });
        await newList.save();
        return newList;
      });

      await Promise.all(seedPromises);
      
      const seededLists = await PredefinedList.find({});
      return NextResponse.json(seededLists.map(list => ({
        id: list._id,
        name: list.name,
        items: list.items,
        lastUpdated: list.lastUpdated
      })));
    }

    return NextResponse.json(lists.map(list => ({
      id: list._id,
      name: list.name,
      items: list.items,
      lastUpdated: list.lastUpdated
    })));
    
  } catch (error: any) {
    console.error('Error fetching lists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lists' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { listId, item } = await request.json();

    if (!listId || !item) {
      return NextResponse.json(
        { error: 'List ID and item are required' },
        { status: 400 }
      );
    }

    const list = await PredefinedList.findById(listId);
    if (!list) {
      return NextResponse.json(
        { error: 'List not found' },
        { status: 404 }
      );
    }

    if (list.items.includes(item)) {
      return NextResponse.json(
        { error: 'Item already exists in list' },
        { status: 409 }
      );
    }

    list.items.push(item);
    list.lastUpdated = new Date();
    await list.save();

    return NextResponse.json({
      id: list._id,
      name: list.name,
      items: list.items,
      lastUpdated: list.lastUpdated
    });

  } catch (error: any) {
    console.error('Error adding item:', error);
    return NextResponse.json(
      { error: 'Failed to add item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { listId, item } = await request.json();

    if (!listId || !item) {
      return NextResponse.json(
        { error: 'List ID and item are required' },
        { status: 400 }
      );
    }

    const list = await PredefinedList.findById(listId);
    if (!list) {
      return NextResponse.json(
        { error: 'List not found' },
        { status: 404 }
      );
    }

    list.items = list.items.filter((i: any) => i !== item);
    list.lastUpdated = new Date();
    await list.save();

    return NextResponse.json({
      id: list._id,
      name: list.name,
      items: list.items,
      lastUpdated: list.lastUpdated
    });

  } catch (error: any) {
    console.error('Error removing item:', error);
    return NextResponse.json(
      { error: 'Failed to remove item' },
      { status: 500 }
    );
  }
}
