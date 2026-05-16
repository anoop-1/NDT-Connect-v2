"""Batch 4: Remaining 58 US industrial cities. Compact but unique-data per city."""
from __future__ import annotations
import json
from pathlib import Path

CITIES: dict[str, dict] = {}
def add(slug, **f): CITIES[slug] = f


def std_us(slug, name, state, sc, *, tier=3, region="us-other", pop=100000,
           industries=None, employers=None, sites=None, codes=None,
           wage=(48000, 68000, 102000), col=88, mult=1.00, asnt="Regional ASNT chapter",
           api=False, surcharge="medium", angles=None, near=None, seasons=None):
    """Compact constructor for tier-2/3 US cities."""
    add(slug,
        displayName=name, country="US", state=state, stateCode=sc,
        tier=tier, region=region, metroPopulation=pop,
        industries=industries or [],
        majorEmployers=employers or [],
        avgInspectorWageUSD={"level1": wage[0], "level2": wage[1], "level3": wage[2]},
        wageBandSource=f"BLS OES {sc} state 2024",
        regionalCodes=codes or ["State DEQ", "API 510/570/653", "ASME Section V/VIII"],
        asntChapter=asnt, awsSection=f"AWS {sc} regional",
        apiExamCenter=api, transportSurchargeBand=surcharge, costOfLivingIndex=col,
        majorPortsRefineriesPlants=sites or [],
        pricingMultiplier=mult,
        uniqueAngles=angles or [],
        nearbyMajorCities=near or [],
        turnaroundSeasons=seasons or ["Spring/Fall TARs"],
    )


# ==========================================================================
# Nuclear / DOE / National Lab cities (high-uniqueness scope)
# ==========================================================================

std_us("albuquerque-nm", "Albuquerque, NM", "New Mexico", "NM",
    tier=2, region="southwest", pop=920000,
    industries=[
        {"name": "Defense & Nuclear", "weight": 0.40, "context": "Sandia National Labs, Kirtland AFB Nuclear Weapons Center"},
        {"name": "Semiconductor", "weight": 0.20, "context": "Intel Rio Rancho fab"},
        {"name": "Aerospace", "weight": 0.15, "context": "Boeing Albuquerque, Northrop Grumman"},
    ],
    employers=["Sandia National Labs", "Kirtland AFB", "Intel Rio Rancho", "Boeing", "L3Harris"],
    wage=(58000, 80000, 124000), col=92, mult=1.05, api=True,
    codes=["DOE 10 CFR 830 (nuclear safety)", "DoD MIL-STD-2154 (UT)", "ASME Section V", "Nadcap NDT"],
    asnt="Sandia/ASNT Albuquerque Section",
    sites=[
        {"name": "Sandia National Labs", "type": "nuclear-r&d", "scale": "Major DOE/NNSA lab"},
        {"name": "Intel Rio Rancho", "type": "semi", "scale": "DRAM/foundry fab"},
    ],
    angles=["Nuclear weapons stockpile stewardship work — DOE Q-clearance often required",
        "Semiconductor UHP gas line inspection at Intel",
        "NM is hub for nuclear waste transportation NDT (WIPP)"],
    near=["Santa Fe (95km)", "El Paso TX (430km)", "Carlsbad NM (470km)"],
)

std_us("carlsbad-nm", "Carlsbad, NM", "New Mexico", "NM",
    tier=3, region="permian", pop=72000,
    industries=[
        {"name": "Permian Oil & Gas", "weight": 0.55, "context": "Eastern Permian Basin (Delaware sub-basin)"},
        {"name": "Nuclear Waste (WIPP)", "weight": 0.20, "context": "Waste Isolation Pilot Plant — only US TRU waste repository"},
        {"name": "Potash Mining", "weight": 0.15, "context": "Mosaic, Intrepid potash operations"},
    ],
    employers=["WIPP DOE site", "Mosaic Potash Carlsbad", "Intrepid Potash",
        "Devon Energy Permian", "EOG Resources", "ConocoPhillips Permian"],
    wage=(60000, 82000, 124000), col=88, mult=1.10, surcharge="high", api=False,
    codes=["DOE 10 CFR 830 (WIPP)", "TX RR Commission (cross-border)", "API 510/570/653"],
    sites=[
        {"name": "WIPP", "type": "nuclear-waste", "scale": "Only US TRU waste repository"},
        {"name": "Delaware Basin", "type": "oil-field", "scale": "Hottest part of Permian"},
    ],
    angles=["Delaware Basin is the most active drilling part of Permian",
        "WIPP — only US deep geologic repository for TRU waste; unique transport NDT scope",
        "Potash mining headgear and conveyor inspection"],
    near=["Hobbs (70km)", "El Paso (240km)", "Albuquerque (470km)"],
)

std_us("farmington-nm", "Farmington, NM", "New Mexico", "NM",
    tier=3, region="southwest", pop=120000,
    industries=[
        {"name": "San Juan Basin Oil & Gas", "weight": 0.55, "context": "Mature gas + coalbed methane basin"},
        {"name": "Coal Power", "weight": 0.22, "context": "Four Corners + San Juan power stations (closing)"},
    ],
    employers=["Hilcorp Energy", "BP Lower 48", "Enterprise Products",
        "PNM Four Corners Power Plant"],
    wage=(56000, 78000, 118000), col=88, mult=1.05, surcharge="medium", api=False,
    codes=["NM Oil Conservation Division", "API 510/570/653", "MSHA (mining)"],
    sites=[
        {"name": "San Juan Basin", "type": "gas-field", "scale": "Major US dry gas/CBM basin"},
        {"name": "San Juan Power Plant", "type": "power", "scale": "1,540 MW (closing 2022-2027)"},
    ],
    angles=["San Juan Basin coalbed methane — gas wellhead + gathering NDT",
        "Power plant decommissioning creates demolition NDT scope",
        "Navajo Nation jurisdictional work — distinct regulatory layer"],
    near=["Albuquerque (290km)", "Durango CO (75km)"],
)

std_us("augusta-ga", "Augusta, GA", "Georgia", "GA",
    tier=2, region="southeast", pop=611000,
    industries=[
        {"name": "Nuclear (SRS)", "weight": 0.40, "context": "Savannah River Site — major DOE nuclear complex"},
        {"name": "Manufacturing", "weight": 0.22, "context": "Plant Vogtle nuclear power station"},
        {"name": "Defense", "weight": 0.18, "context": "Fort Eisenhower (formerly Fort Gordon)"},
    ],
    employers=["Savannah River Site (SRS)", "Plant Vogtle (Southern Nuclear)",
        "Bechtel SRS", "Centerra-SRS", "International Paper"],
    wage=(56000, 78000, 122000), col=88, mult=1.05, api=True,
    codes=["DOE 10 CFR 830", "ASME Section III/XI (nuclear)", "10 CFR 50 (commercial nuclear)"],
    asnt="ASNT South Carolina/Georgia (Augusta-Aiken area)",
    sites=[
        {"name": "Savannah River Site", "type": "nuclear", "scale": "Major DOE/NNSA complex — 800 km²"},
        {"name": "Plant Vogtle", "type": "nuclear-power", "scale": "Vogtle 3+4 — newest US reactors"},
    ],
    angles=["Plant Vogtle 3+4 — first new US reactors in 30+ years; ongoing inspection scope",
        "SRS H-Canyon — only operating production-scale nuclear reprocessing in US",
        "DOE Q-clearance often required for SRS work"],
    near=["Columbia SC (140km)", "Atlanta (250km)", "Aiken SC (35km)"],
)

std_us("columbia-sc", "Columbia, SC", "South Carolina", "SC",
    tier=3, region="southeast", pop=850000,
    industries=[
        {"name": "Nuclear Fuel", "weight": 0.32, "context": "Westinghouse Columbia Fuel Fabrication Facility"},
        {"name": "Manufacturing", "weight": 0.25, "context": "Mahindra Tractor, Owens Corning"},
        {"name": "Defense", "weight": 0.18, "context": "Fort Jackson Army training base"},
    ],
    employers=["Westinghouse Columbia", "Mahindra USA",
        "International Paper", "Fort Jackson"],
    wage=(50000, 70000, 108000), col=86, mult=1.00, api=False,
    codes=["NRC 10 CFR 70 (fuel fab)", "ASME Section III", "API 510/570/653"],
    sites=[
        {"name": "Westinghouse Columbia Fuel Fab", "type": "nuclear-fuel", "scale": "Major US LWR fuel manufacturer"},
    ],
    angles=["Westinghouse fuel fabrication — uranium handling NDT (zircaloy cladding UT)",
        "Adjacent to Vogtle and Summer nuclear plants — mutual aid contractor pool",
        "Fort Jackson basic training facility — military aerospace + ground vehicle NDT"],
    near=["Charleston SC (200km)", "Augusta GA (140km)"],
)

std_us("charleston-sc", "Charleston, SC", "South Carolina", "SC",
    tier=2, region="southeast", pop=820000,
    industries=[
        {"name": "Aerospace", "weight": 0.42, "context": "Boeing 787 Final Assembly Line + Mid-body fab"},
        {"name": "Naval & Defense", "weight": 0.22, "context": "Naval Information Warfare Center, Joint Base Charleston"},
        {"name": "Port", "weight": 0.18, "context": "Port of Charleston — top-10 US container port"},
    ],
    employers=["Boeing South Carolina", "Mercedes-Benz Vans Charleston",
        "Naval Information Warfare Center", "Bosch Charleston"],
    wage=(54000, 76000, 118000), col=92, mult=1.05, api=True,
    codes=["AS9100 (Boeing)", "Nadcap NDT", "ABS class rules (port)", "API 510/570/653"],
    asnt="ASNT South Carolina Section",
    sites=[
        {"name": "Boeing Charleston 787 FAL", "type": "aerospace", "scale": "Final assembly + mid-body fab for 787"},
        {"name": "Port of Charleston", "type": "port", "scale": "Top-10 US container port"},
    ],
    angles=["Boeing Charleston is one of two 787 final assembly lines globally",
        "Composite NDT (UT C-scan, thermography) is dominant skill demand",
        "Joint Base Charleston aviation MRO scope (C-17 Globemaster fleet)"],
    near=["Savannah GA (170km)", "Columbia (200km)"],
)

std_us("charleston-wv", "Charleston, WV", "West Virginia", "WV",
    tier=2, region="appalachia", pop=210000,
    industries=[
        {"name": "Chemical Valley", "weight": 0.45, "context": "Kanawha Valley — Dow, Bayer CropScience, Union Carbide legacy"},
        {"name": "Coal", "weight": 0.20, "context": "Central Appalachian coal — declining"},
        {"name": "Natural Gas (Marcellus)", "weight": 0.18, "context": "Marcellus + Utica shale gas processing"},
    ],
    employers=["Dow Chemical Charleston (Institute)", "Bayer CropScience",
        "Union Carbide South Charleston", "Mountaineer NGL Storage", "Toyota Buffalo Plant"],
    wage=(52000, 72000, 110000), col=82, mult=1.00, api=False,
    codes=["WV DEP", "Marcellus midstream codes", "API 510/570/653", "ASME"],
    sites=[
        {"name": "Dow Institute (Charleston)", "type": "petrochem", "scale": "Major chemical manufacturing"},
        {"name": "Bayer CropScience Institute", "type": "chemical", "scale": "Pesticide manufacturing"},
    ],
    angles=["Kanawha Valley historically dense chemical cluster — legacy 'Chemical Alley'",
        "Toxic chemical service (MIC after Bhopal-style review) — strict inspection regime",
        "Marcellus/Utica gas processing creates new midstream NDT scope"],
    near=["Huntington (90km)", "Pittsburgh (340km)"],
)

std_us("huntington-wv", "Huntington, WV", "West Virginia", "WV",
    tier=3, region="appalachia", pop=350000,
    industries=[
        {"name": "Refining (Marathon)", "weight": 0.42, "context": "Marathon Catlettsburg KY across the river — major scope"},
        {"name": "Heavy Manufacturing", "weight": 0.22, "context": "Steel of West Virginia, Special Metals (nickel alloys)"},
        {"name": "Aluminum", "weight": 0.15, "context": "Marshall University engineering programs"},
    ],
    employers=["Marathon Catlettsburg Refinery (across Ohio River)",
        "Special Metals Corporation (Inconel)", "Steel of West Virginia",
        "AK Steel (Ashland KY)"],
    wage=(50000, 70000, 108000), col=80, mult=1.00, api=False,
    codes=["WV DEP", "KY DEP (refinery across river)", "API 510/570/653"],
    sites=[
        {"name": "Marathon Catlettsburg Refinery", "type": "refinery", "scale": "291,000 bpd (in KY, services Huntington area)"},
        {"name": "Special Metals Huntington", "type": "alloy", "scale": "Major nickel superalloy producer (Inconel, Monel)"},
    ],
    angles=["Marathon Catlettsburg is one of largest US refineries — across Ohio River from Huntington",
        "Special Metals is global nickel superalloy producer — unique HiTemp NDT specialty",
        "Steel of WV pipe mill UT inspection scope"],
    near=["Charleston WV (90km)", "Cincinnati (250km)", "Lexington KY (180km)"],
)

std_us("steubenville-oh", "Steubenville, OH", "Ohio", "OH",
    tier=3, region="appalachia", pop=120000,
    industries=[
        {"name": "Steel Manufacturing", "weight": 0.42, "context": "JSW Steel Mingo Junction (former Wheeling-Pitt)"},
        {"name": "Coal Mining", "weight": 0.22, "context": "Murray Energy operations historically"},
        {"name": "Power", "weight": 0.18, "context": "Cardinal Power Plant, Mountaineer Plant"},
    ],
    employers=["JSW Steel Mingo Junction", "AEP Cardinal Power Plant",
        "Mountaineer Power Plant", "Mid-Atlantic Carbon"],
    wage=(48000, 68000, 105000), col=78, mult=0.95, api=False,
    codes=["Ohio EPA", "API 510/570/653", "ASME Section I (boilers)"],
    sites=[
        {"name": "JSW Steel Mingo Junction", "type": "steel", "scale": "EAF + finishing"},
        {"name": "Cardinal Power Plant", "type": "power", "scale": "1,830 MW coal-fired"},
    ],
    angles=["Ohio Valley steel and coal corridor — legacy industrial inspection cluster",
        "Coal-fired power plant tube inspection (boiler, super-heater)",
        "Mountaineer Plant — major IGCC inspection scope"],
    near=["Pittsburgh (60km)", "Wheeling WV (15km)"],
)

# ==========================================================================
# Naval shipbuilding cities
# ==========================================================================

std_us("bath-me", "Bath, ME", "Maine", "ME",
    tier=2, region="northeast", pop=8500,
    industries=[
        {"name": "Navy Shipbuilding", "weight": 0.85, "context": "Bath Iron Works — DDG-51 Burke-class destroyers"},
    ],
    employers=["Bath Iron Works (General Dynamics)"],
    wage=(56000, 78000, 118000), col=88, mult=1.10, api=False,
    codes=["NAVSEA Tech Pubs", "Mil-Spec NDT (T9074-AS-GIB-010/271)", "ABS class"],
    asnt="ASNT New England Section",
    sites=[
        {"name": "Bath Iron Works", "type": "shipyard", "scale": "Builds DDG-51 Burke-class destroyers for US Navy"},
    ],
    angles=["BIW is one of two US yards building destroyers — Mil-Spec NDT dominant",
        "Welder/inspector ratios per Navy spec",
        "Cold-weather Maine work — winter conditions affect outdoor scope"],
    near=["Portland ME (60km)", "Boston (240km)"],
)

std_us("groton-ct", "Groton, CT", "Connecticut", "CT",
    tier=2, region="northeast", pop=39000,
    industries=[
        {"name": "Submarine Construction", "weight": 0.92, "context": "General Dynamics Electric Boat — Virginia-class + Columbia-class submarines"},
    ],
    employers=["Electric Boat (General Dynamics)", "US Naval Submarine Base New London"],
    wage=(62000, 85000, 130000), col=98, mult=1.15, api=False,
    codes=["NAVSEA SubSafe program", "Mil-Spec NDT", "DoD NDT requirements"],
    asnt="ASNT Connecticut Section",
    sites=[
        {"name": "Electric Boat Groton", "type": "shipyard", "scale": "Designs + builds US nuclear submarines"},
    ],
    angles=["Electric Boat is the design + lead-yard for all US nuclear submarines",
        "SubSafe program — most rigorous structural NDT regime in any US program",
        "Often requires DoD secret/TS clearance"],
    near=["New Haven (75km)", "Providence RI (95km)", "New London (5km)"],
)

std_us("newport-news-va", "Newport News, VA", "Virginia", "VA",
    tier=1, region="south-atlantic", pop=185000,
    industries=[
        {"name": "Navy Shipbuilding", "weight": 0.55, "context": "HII Newport News — only US builder of CVN aircraft carriers + Virginia-class subs"},
        {"name": "Aerospace MRO", "weight": 0.15, "context": "Northrop Grumman Newport News"},
        {"name": "Refining", "weight": 0.12, "context": "Yorktown refinery converted to terminal"},
    ],
    employers=["HII Newport News Shipbuilding (largest in US)",
        "Naval Weapons Station Yorktown", "Jefferson Lab"],
    wage=(60000, 82000, 125000), col=92, mult=1.10, api=False,
    codes=["NAVSEA Tech Pubs", "Mil-Spec NDT", "ASME Section III (nuclear refueling)"],
    asnt="ASNT Hampton Roads Section",
    sites=[
        {"name": "HII Newport News Shipbuilding", "type": "shipyard", "scale": "Only US CVN builder — Ford-class"},
        {"name": "Naval Weapons Station Yorktown", "type": "naval", "scale": "Ammunition + ordnance"},
    ],
    angles=["Newport News — largest industrial site in Virginia; only US carrier shipyard",
        "Nuclear-powered carrier reactor refueling — ASME Section III scope",
        "CVN-78 Ford-class commissioning still being worked through"],
    near=["Norfolk (35km)", "Virginia Beach (55km)", "Richmond (110km)"],
)

std_us("norfolk-va", "Norfolk, VA", "Virginia", "VA",
    tier=2, region="south-atlantic", pop=1810000,
    industries=[
        {"name": "Naval Operations", "weight": 0.40, "context": "Norfolk Naval Shipyard — fleet repair + nuclear refueling"},
        {"name": "Port", "weight": 0.22, "context": "Port of Virginia — major US container port"},
        {"name": "Defense Manufacturing", "weight": 0.15, "context": "Multiple defense contractor offices"},
    ],
    employers=["Norfolk Naval Shipyard (Portsmouth)", "Port of Virginia",
        "BAE Systems Norfolk Ship Repair", "Lyon Shipyard"],
    wage=(56000, 78000, 120000), col=92, mult=1.05, api=False,
    codes=["NAVSEA Tech Pubs", "Mil-Spec NDT", "ASME Section III/XI", "ABS class"],
    asnt="ASNT Hampton Roads Section",
    sites=[
        {"name": "Norfolk Naval Shipyard (Portsmouth)", "type": "naval-shipyard", "scale": "One of 4 US public shipyards — fleet repair, nuclear"},
        {"name": "Port of Virginia", "type": "port", "scale": "Top-5 US container port"},
    ],
    angles=["Norfolk Naval Shipyard — only US public yard performing CVN refueling on East Coast",
        "Nuclear-trained NDT inspectors — ASME Section XI ISI specialty",
        "Naval Region Mid-Atlantic — fleet inspection scope"],
    near=["Newport News (35km)", "Virginia Beach (25km)", "Richmond (170km)"],
)

std_us("portsmouth-va", "Portsmouth, VA", "Virginia", "VA",
    tier=3, region="south-atlantic", pop=98000,
    industries=[
        {"name": "Naval Shipbuilding/Repair", "weight": 0.65, "context": "Norfolk Naval Shipyard located here"},
    ],
    employers=["Norfolk Naval Shipyard", "BAE Systems Norfolk Ship Repair"],
    wage=(54000, 76000, 116000), col=88, mult=1.05, api=False,
    codes=["NAVSEA Tech Pubs", "Mil-Spec NDT", "ASME Section XI"],
    sites=[
        {"name": "Norfolk Naval Shipyard", "type": "naval-shipyard", "scale": "US Navy's oldest continuously operating shipyard"},
    ],
    angles=["Often confused with Portsmouth NH — this Portsmouth hosts Norfolk Naval Shipyard",
        "Naval reactor refueling on East Coast carriers",
        "Fleet repair and overhaul — diverse vessel types"],
    near=["Norfolk (10km)", "Newport News (30km)"],
)

# ==========================================================================
# Aerospace / Defense cities
# ==========================================================================

std_us("cape-canaveral-fl", "Cape Canaveral, FL", "Florida", "FL",
    tier=2, region="southeast", pop=11000,
    industries=[
        {"name": "Space Launch", "weight": 0.85, "context": "Kennedy Space Center, Cape Canaveral SFS — SpaceX, ULA, Blue Origin"},
    ],
    employers=["NASA Kennedy Space Center", "SpaceX", "United Launch Alliance",
        "Blue Origin", "Boeing Space Coast", "L3Harris Melbourne (nearby)"],
    wage=(58000, 82000, 128000), col=92, mult=1.10, api=False, surcharge="medium",
    codes=["NASA-STD-5009 (NDT)", "AS9100", "Nadcap NDT", "USAF Tech Orders (SFS)"],
    asnt="ASNT Florida East Coast Section",
    sites=[
        {"name": "Kennedy Space Center", "type": "aerospace-launch", "scale": "Premier US space launch facility"},
        {"name": "Cape Canaveral SFS", "type": "military-launch", "scale": "USSF launch site"},
    ],
    angles=["Rocket-grade NDT — solid + liquid propellant tankage UT/RT/Nadcap",
        "SpaceX Falcon 9 booster reuse — recovered booster inspection unique scope",
        "NASA-STD-5009 supersedes ASME for spaceflight pressure vessels"],
    near=["Orlando (100km)", "Melbourne FL (60km)", "Miami (350km)"],
)

std_us("melbourne-fl", "Melbourne, FL", "Florida", "FL",
    tier=2, region="southeast", pop=550000,
    industries=[
        {"name": "Aerospace & Defense", "weight": 0.45, "context": "L3Harris HQ, Northrop Grumman Melbourne, Embraer"},
        {"name": "Space Coast Support", "weight": 0.20, "context": "Adjacent to Cape Canaveral; SpaceX, ULA suppliers"},
    ],
    employers=["L3Harris Technologies HQ", "Northrop Grumman Melbourne",
        "Embraer Executive Aircraft Melbourne", "DRS Technologies"],
    wage=(56000, 78000, 122000), col=92, mult=1.05, api=False,
    codes=["AS9100", "Nadcap NDT", "DoD MIL-STD-2154"],
    asnt="ASNT Florida East Coast",
    sites=[
        {"name": "L3Harris Melbourne", "type": "defense", "scale": "Defense electronics + EW"},
        {"name": "Embraer Melbourne", "type": "aerospace", "scale": "Phenom + Praetor business jet final assembly"},
    ],
    angles=["L3Harris HQ — major US defense electronics + EW contractor",
        "Embraer is only foreign OEM with US business-jet final assembly",
        "Northrop Grumman E-2 Hawkeye + radar systems work"],
    near=["Cape Canaveral (60km)", "Orlando (105km)", "Miami (320km)"],
)

std_us("huntsville-al", "Huntsville, AL", "Alabama", "AL",
    tier=2, region="southeast", pop=510000,
    industries=[
        {"name": "Aerospace (NASA + DoD)", "weight": 0.42, "context": "NASA Marshall Space Flight Center, Redstone Arsenal"},
        {"name": "Defense Manufacturing", "weight": 0.25, "context": "Boeing, Lockheed, Aerojet Rocketdyne, Dynetics"},
        {"name": "Auto Manufacturing", "weight": 0.15, "context": "Mazda Toyota Manufacturing Huntsville"},
    ],
    employers=["NASA Marshall Space Flight Center", "Redstone Arsenal (Army)",
        "Boeing Huntsville (SLS)", "Aerojet Rocketdyne", "Dynetics",
        "Mazda Toyota Manufacturing"],
    wage=(58000, 80000, 124000), col=88, mult=1.05, api=False,
    codes=["NASA-STD-5009", "MIL-STD-2154", "AS9100", "Nadcap NDT"],
    asnt="ASNT Tennessee Valley Section",
    sites=[
        {"name": "NASA Marshall Space Flight Center", "type": "aerospace-r&d", "scale": "Lead center for SLS rocket"},
        {"name": "Redstone Arsenal", "type": "military-r&d", "scale": "Army aviation + missile R&D"},
    ],
    angles=["NASA Marshall — lead center for SLS rocket; major heritage in propulsion",
        "Aerojet Rocketdyne — RS-25 (Shuttle/SLS) engine inspection",
        "Dual NASA + DoD aerospace ecosystem"],
    near=["Birmingham (150km)", "Nashville (200km)", "Atlanta (330km)"],
)

std_us("marietta-ga", "Marietta, GA", "Georgia", "GA",
    tier=3, region="southeast", pop=60000,
    industries=[
        {"name": "Aerospace Manufacturing", "weight": 0.65, "context": "Lockheed Martin Marietta — F-22, C-130, P-3"},
    ],
    employers=["Lockheed Martin Aeronautics Marietta", "Dobbins ARB"],
    wage=(56000, 78000, 122000), col=88, mult=1.05, api=False,
    codes=["AS9100", "Nadcap NDT", "MIL-STD-2154", "USAF Tech Orders"],
    asnt="ASNT Atlanta Section",
    sites=[
        {"name": "Lockheed Marietta", "type": "aerospace", "scale": "F-22 Raptor depot, C-130 Hercules production"},
    ],
    angles=["Lockheed Marietta is C-130 birthplace + sole F-22 depot",
        "Composite NDT + airframe weld inspection",
        "Dobbins ARB — Air Force Reserve testing"],
    near=["Atlanta (30km)", "Birmingham (250km)"],
)

std_us("hartford-ct", "Hartford, CT", "Connecticut", "CT",
    tier=2, region="northeast", pop=1210000,
    industries=[
        {"name": "Aerospace (Pratt & Whitney)", "weight": 0.40, "context": "P&W HQ + Middletown manufacturing"},
        {"name": "Insurance HQ", "weight": 0.25, "context": "The Hartford, Aetna, Travelers"},
        {"name": "Defense", "weight": 0.15, "context": "Sikorsky Aircraft (Stratford), Otis Aerospace"},
    ],
    employers=["Pratt & Whitney HQ + Middletown plant",
        "Collins Aerospace (Windsor Locks)", "Sikorsky Aircraft Stratford",
        "Electric Boat Groton (90km)"],
    wage=(60000, 84000, 128000), col=98, mult=1.10, api=False,
    codes=["AS9100", "Nadcap NDT", "Mil-Spec NDT (Sikorsky)", "EASA Part-145"],
    asnt="ASNT Connecticut Section",
    sites=[
        {"name": "Pratt & Whitney Middletown", "type": "aero-engines", "scale": "PW1000G GTF + F135 (F-35) manufacturing"},
        {"name": "Sikorsky Stratford", "type": "helicopter", "scale": "Black Hawk + commercial helicopter"},
    ],
    angles=["P&W is one of the 'Big Three' jet engine makers — F-35 sole-source engine",
        "Engine UT (turbine disk inspection) is highest-stakes NDT in aerospace",
        "Connecticut Aerospace Cluster — densest aerospace NDT market in NE"],
    near=["New Haven (60km)", "Boston (160km)", "New York (185km)"],
)

std_us("rockford-il", "Rockford, IL", "Illinois", "IL",
    tier=3, region="midwest", pop=340000,
    industries=[
        {"name": "Aerospace", "weight": 0.30, "context": "Collins Aerospace (Hamilton Sundstrand)"},
        {"name": "Heavy Manufacturing", "weight": 0.25, "context": "Woodward Inc, Stenstrom"},
    ],
    employers=["Collins Aerospace Rockford (Hamilton Sundstrand)",
        "Woodward Inc", "Sundstrand Aerospace"],
    wage=(50000, 70000, 108000), col=82, mult=1.00, api=False,
    codes=["AS9100", "Nadcap NDT"],
    asnt="ASNT Northern Illinois",
    sites=[{"name": "Collins Aerospace Rockford", "type": "aerospace", "scale": "Aircraft electrical, environmental, engine systems"}],
    angles=["Collins Aerospace Rockford — major aircraft systems supplier",
        "Sundstrand legacy in APUs and constant-speed drives",
        "Mid-volume aerospace component manufacturing"],
    near=["Chicago (140km)", "Madison WI (110km)"],
)

std_us("dayton-oh", "Dayton, OH", "Ohio", "OH",
    tier=2, region="midwest", pop=815000,
    industries=[
        {"name": "Aerospace (USAF)", "weight": 0.42, "context": "Wright-Patterson AFB — Air Force Materiel Command HQ"},
        {"name": "Auto & Manufacturing", "weight": 0.22, "context": "GM Moraine, Honda Anna engine plant nearby"},
    ],
    employers=["Wright-Patterson AFB", "GE Aviation Dayton",
        "Honda Anna Engine Plant (90km)", "Air Force Research Lab"],
    wage=(54000, 76000, 116000), col=82, mult=1.00, api=False,
    codes=["USAF Tech Orders", "MIL-STD-2154", "AS9100", "ASTM E1444 (MT)"],
    asnt="ASNT Dayton Section (founded 1948 — one of oldest)",
    sites=[
        {"name": "Wright-Patterson AFB", "type": "military-aerospace", "scale": "AFMC HQ — depot maintenance + R&D"},
        {"name": "Air Force Research Lab", "type": "r&d", "scale": "USAF NDT R&D — many ASNT standards originated here"},
    ],
    angles=["AFRL Materials & Manufacturing Directorate — birthplace of many NDT standards",
        "Wright-Patt depot maintenance — F-15, F-22, C-17 service",
        "Founding ASNT chapter — long-standing inspector training tradition"],
    near=["Cincinnati (90km)", "Columbus (115km)", "Indianapolis (175km)"],
)

std_us("cincinnati-oh", "Cincinnati, OH", "Ohio", "OH",
    tier=2, region="midwest", pop=2260000,
    industries=[
        {"name": "Aerospace Engines", "weight": 0.32, "context": "GE Aviation HQ + Evendale plant"},
        {"name": "Consumer Goods", "weight": 0.22, "context": "P&G HQ, Kroger HQ"},
        {"name": "Steel & Manufacturing", "weight": 0.15, "context": "AK Steel/Cleveland-Cliffs Middletown"},
    ],
    employers=["GE Aviation HQ (Evendale)", "Cleveland-Cliffs Middletown",
        "Procter & Gamble HQ", "Kroger HQ"],
    wage=(54000, 76000, 116000), col=82, mult=1.00, api=False,
    codes=["AS9100", "Nadcap NDT", "API 510/570/653", "ASME"],
    asnt="ASNT Cincinnati Section",
    sites=[
        {"name": "GE Aviation Evendale", "type": "aero-engines", "scale": "GE9X, GEnx, F110 engine manufacturing"},
        {"name": "Cleveland-Cliffs Middletown Works", "type": "steel", "scale": "Integrated steel mill"},
    ],
    angles=["GE Aviation Evendale — major US commercial + military jet engine producer",
        "Engine disk inspection (UT phased array, ECT) is high-stakes NDT",
        "Cleveland-Cliffs Middletown — flat-rolled steel mill UT scope"],
    near=["Dayton (90km)", "Indianapolis (185km)", "Lexington (140km)"],
)

std_us("indianapolis-in", "Indianapolis, IN", "Indiana", "IN",
    tier=2, region="midwest", pop=2120000,
    industries=[
        {"name": "Aerospace Engines", "weight": 0.30, "context": "Rolls-Royce Indianapolis — military + commercial engines"},
        {"name": "Pharmaceuticals", "weight": 0.25, "context": "Eli Lilly HQ, Roche Diagnostics"},
        {"name": "Auto & Heavy Manufacturing", "weight": 0.18, "context": "Allison Transmission, Cummins Columbus"},
    ],
    employers=["Rolls-Royce North America Indianapolis",
        "Eli Lilly", "Allison Transmission", "Cummins (Columbus, 70km)"],
    wage=(52000, 72000, 112000), col=84, mult=1.00, api=False,
    codes=["AS9100", "Nadcap NDT", "FDA cGMP (pharma)", "ASME"],
    asnt="ASNT Indianapolis Section",
    sites=[
        {"name": "Rolls-Royce Indianapolis", "type": "aero-engines", "scale": "AE2100 (C-130J), AE3007, F405 (T-45)"},
        {"name": "Allison Transmission", "type": "manufacturing", "scale": "World leader in commercial transmissions"},
    ],
    angles=["Rolls-Royce Indianapolis — only US Rolls-Royce military engine manufacturing",
        "Allison Transmission test cells — high-cycle fatigue NDT",
        "Pharma SS welding (USP Class VI compliance)"],
    near=["Cincinnati (185km)", "Chicago (300km)", "Louisville (180km)"],
)

std_us("lima-oh", "Lima, OH", "Ohio", "OH",
    tier=3, region="midwest", pop=104000,
    industries=[
        {"name": "Refining", "weight": 0.42, "context": "Cenovus Lima Refinery — 175,000 bpd"},
        {"name": "Defense Manufacturing", "weight": 0.30, "context": "Joint Systems Manufacturing Center (Abrams tank plant)"},
    ],
    employers=["Cenovus Lima Refinery", "Joint Systems Manufacturing Center (GD Land Systems)"],
    wage=(56000, 78000, 118000), col=78, mult=1.00, api=False,
    codes=["Ohio EPA", "API 510/570/653", "Mil-Spec (tank plant)"],
    asnt="ASNT Lima Section",
    sites=[
        {"name": "Cenovus Lima Refinery", "type": "refinery", "scale": "175,000 bpd"},
        {"name": "Lima Army Tank Plant", "type": "defense", "scale": "Only US M1 Abrams tank manufacturer"},
    ],
    angles=["Lima is the ONLY US Abrams tank manufacturing plant",
        "Cenovus Lima — well-engineered mid-size Midwestern refinery",
        "Tank armor weld inspection — very thick-section UT specialty"],
    near=["Toledo (130km)", "Dayton (130km)", "Indianapolis (290km)"],
)

std_us("toledo-oh", "Toledo, OH", "Ohio", "OH",
    tier=2, region="midwest", pop=600000,
    industries=[
        {"name": "Refining", "weight": 0.30, "context": "BP-Husky Toledo + PBF Toledo"},
        {"name": "Glass Manufacturing", "weight": 0.22, "context": "Pilkington/NSG, Owens-Illinois HQ — 'Glass Capital'"},
        {"name": "Auto", "weight": 0.20, "context": "Stellantis Toledo Assembly (Jeep Wrangler)"},
    ],
    employers=["BP-Husky Toledo Refinery", "PBF Toledo Refinery",
        "Pilkington/NSG", "Owens-Illinois", "Owens Corning HQ",
        "Stellantis Toledo Assembly"],
    wage=(54000, 76000, 116000), col=80, mult=1.00, api=True,
    codes=["Ohio EPA", "API 510/570/653", "ASME"],
    asnt="ASNT Toledo Section",
    sites=[
        {"name": "BP-Husky Toledo Refinery", "type": "refinery", "scale": "160,000 bpd"},
        {"name": "PBF Toledo Refinery", "type": "refinery", "scale": "175,000 bpd"},
        {"name": "Stellantis Toledo Assembly", "type": "auto", "scale": "Jeep Wrangler + Gladiator"},
    ],
    angles=["Two adjacent refineries in metro area — combined ~335k bpd capacity",
        "Glass furnace inspection — unique high-temp ceramic/refractory NDT",
        "Auto stamping plant weldment NDT for body-in-white"],
    near=["Detroit (90km)", "Cleveland (180km)", "Cincinnati (300km)"],
)

# ==========================================================================
# Steel and heavy manufacturing
# ==========================================================================

std_us("gary-in", "Gary, IN", "Indiana", "IN",
    tier=2, region="midwest", pop=265000,
    industries=[
        {"name": "Integrated Steel", "weight": 0.85, "context": "U.S. Steel Gary Works — largest integrated steel mill in US"},
    ],
    employers=["U.S. Steel Gary Works", "ArcelorMittal Indiana Harbor East Chicago",
        "BP Whiting Refinery (Whiting, 25km)"],
    wage=(58000, 80000, 124000), col=82, mult=1.05, api=False,
    codes=["Indiana DEM", "ASME Section I (boilers)", "API 510 (limited)", "AISI standards"],
    asnt="ASNT Calumet Section",
    sites=[
        {"name": "U.S. Steel Gary Works", "type": "steel", "scale": "Largest integrated steel mill in US — 7.5 MTPA"},
        {"name": "ArcelorMittal Indiana Harbor", "type": "steel", "scale": "Largest US steel complex by area"},
    ],
    angles=["Gary Works is the largest integrated steel mill in US",
        "BOF, BF, hot strip mill, coke plant — all on one site",
        "Diverse NDT scope: ladles, casters, rolls, mill cranes"],
    near=["Chicago (50km)", "Indianapolis (240km)"],
)

std_us("youngstown-oh", "Youngstown, OH", "Ohio", "OH",
    tier=3, region="appalachia", pop=540000,
    industries=[
        {"name": "OCTG Pipe Manufacturing", "weight": 0.42, "context": "Vallourec Star — seamless OCTG"},
        {"name": "Steel", "weight": 0.22, "context": "Mahoning Valley legacy steel; JSW Steel Valbruna"},
    ],
    employers=["Vallourec Star (Youngstown OCTG)", "JSW Steel USA (Mingo Junction)",
        "RTI International Metals (titanium)"],
    wage=(50000, 70000, 108000), col=78, mult=0.95, api=False,
    codes=["API 5CT (OCTG)", "API 5L (line pipe)", "ASTM"],
    asnt="ASNT Mahoning Valley Section",
    sites=[
        {"name": "Vallourec Star Youngstown", "type": "pipe-mill", "scale": "Major US OCTG seamless pipe producer"},
        {"name": "RTI Niles Titanium Plant", "type": "titanium", "scale": "Major US titanium mill"},
    ],
    angles=["OCTG seamless pipe inspection — full-body UT, EMI, eddy-current",
        "Titanium ingot RT and UT for aerospace specs",
        "Mahoning Valley — Bessemer/open-hearth steel heritage"],
    near=["Pittsburgh (110km)", "Cleveland (110km)"],
)

std_us("pueblo-co", "Pueblo, CO", "Colorado", "CO",
    tier=3, region="rockies", pop=170000,
    industries=[
        {"name": "Steel", "weight": 0.42, "context": "EVRAZ Rocky Mountain Steel (long products)"},
        {"name": "Defense Storage", "weight": 0.20, "context": "Pueblo Chemical Depot (chemical weapons destruction site)"},
    ],
    employers=["EVRAZ Rocky Mountain Steel", "Pueblo Chemical Depot",
        "Vestas Wind Towers Pueblo"],
    wage=(50000, 70000, 108000), col=82, mult=0.95, api=False,
    codes=["Colorado DPHE", "AISI", "ASME", "Mil-Spec (depot)"],
    asnt="ASNT Rocky Mountain Section",
    sites=[
        {"name": "EVRAZ Rocky Mountain Steel", "type": "steel", "scale": "Long products: rail, rod, bar"},
        {"name": "Vestas Pueblo", "type": "wind-tower", "scale": "Wind tower manufacturing"},
    ],
    angles=["EVRAZ Pueblo — major US rail manufacturer",
        "Vestas wind tower welding inspection (large-scale circumferential UT)",
        "Pueblo Chemical Depot — destruction of legacy chemical weapons"],
    near=["Colorado Springs (75km)", "Denver (180km)", "Albuquerque (480km)"],
)

# ==========================================================================
# Auto manufacturing cities
# ==========================================================================

std_us("spartanburg-sc", "Spartanburg, SC", "South Carolina", "SC",
    tier=2, region="southeast", pop=350000,
    industries=[
        {"name": "Auto Manufacturing", "weight": 0.55, "context": "BMW Spartanburg — largest BMW plant globally; Michelin"},
    ],
    employers=["BMW Manufacturing (Plant Spartanburg)", "Michelin Greenville-Spartanburg",
        "Adidas / Nutramax", "AFL Telecommunications"],
    wage=(50000, 70000, 108000), col=80, mult=1.00, api=False,
    codes=["IATF 16949 (auto)", "VDA 6.1 (German auto NDT)", "ASTM E114 (UT)"],
    asnt="ASNT Carolinas Section",
    sites=[
        {"name": "BMW Plant Spartanburg", "type": "auto", "scale": "Largest BMW plant globally — X3, X5, X6, X7"},
        {"name": "Michelin North America HQ", "type": "tire", "scale": "Tire R&D + manufacturing"},
    ],
    angles=["BMW Spartanburg — only US BMW plant; X-series exports globally",
        "Auto industry weld inspection (resistance, MIG, robotic UT)",
        "Michelin tire steel cord radiographic inspection"],
    near=["Greenville SC (40km)", "Charlotte (130km)", "Atlanta (290km)"],
)

std_us("nashville-tn", "Nashville, TN", "Tennessee", "TN",
    tier=2, region="southeast", pop=2010000,
    industries=[
        {"name": "Auto", "weight": 0.32, "context": "Nissan Smyrna, Bridgestone HQ, GM Spring Hill"},
        {"name": "Healthcare HQs", "weight": 0.22, "context": "HCA Healthcare HQ, Vanderbilt Health"},
    ],
    employers=["Nissan North America (Smyrna)", "Bridgestone Americas HQ",
        "GM Spring Hill Manufacturing", "HCA Healthcare"],
    wage=(50000, 70000, 108000), col=88, mult=1.00, api=False,
    codes=["IATF 16949", "API 510/570/653", "ASME"],
    asnt="ASNT Tennessee Section",
    sites=[
        {"name": "Nissan Smyrna", "type": "auto", "scale": "Largest US Nissan plant — 800k vehicles/year"},
        {"name": "GM Spring Hill", "type": "auto", "scale": "GM SUV + EV production"},
    ],
    angles=["Multiple major auto plants — Nissan, GM, Bridgestone",
        "EV battery pack inspection (laser welds, UT thru weld)",
        "Healthcare equipment NDT — Vanderbilt research"],
    near=["Memphis (340km)", "Atlanta (400km)", "Louisville (290km)"],
)

std_us("memphis-tn", "Memphis, TN", "Tennessee", "TN",
    tier=2, region="southeast", pop=1340000,
    industries=[
        {"name": "Logistics & Aviation", "weight": 0.32, "context": "FedEx World Hub — busiest cargo airport"},
        {"name": "Auto", "weight": 0.22, "context": "Ford BlueOval City Stanton (under construction)"},
        {"name": "Refining", "weight": 0.18, "context": "Valero Memphis Refinery"},
    ],
    employers=["FedEx (HQ + Memphis hub)", "Valero Memphis Refinery",
        "Ford BlueOval City (Stanton)", "International Paper", "AutoZone HQ"],
    wage=(50000, 70000, 108000), col=82, mult=1.00, api=False,
    codes=["TN DEC", "API 510/570/653", "FAA Part 145"],
    asnt="ASNT Memphis Section",
    sites=[
        {"name": "Valero Memphis Refinery", "type": "refinery", "scale": "195,000 bpd"},
        {"name": "FedEx World Hub", "type": "aviation", "scale": "Busiest cargo airport globally"},
    ],
    angles=["FedEx hub — air cargo aircraft heavy maintenance NDT",
        "BlueOval City — Ford F-150 Lightning EV mega-plant under construction",
        "Mississippi River barge inspection scope"],
    near=["Nashville (340km)", "Little Rock (220km)", "Jackson MS (340km)"],
)

# ==========================================================================
# Power generation / nuclear cities
# ==========================================================================

std_us("chattanooga-tn", "Chattanooga, TN", "Tennessee", "TN",
    tier=2, region="southeast", pop=565000,
    industries=[
        {"name": "Auto", "weight": 0.32, "context": "Volkswagen Chattanooga Assembly"},
        {"name": "Nuclear (Sequoyah/Watts Bar)", "weight": 0.22, "context": "TVA Sequoyah + Watts Bar nuclear plants nearby"},
        {"name": "Manufacturing", "weight": 0.18, "context": "Komatsu, Wacker Polysilicon"},
    ],
    employers=["Volkswagen Chattanooga", "TVA Sequoyah Nuclear (40km)",
        "TVA Watts Bar Nuclear", "Komatsu America"],
    wage=(50000, 70000, 108000), col=84, mult=1.00, api=False,
    codes=["10 CFR 50 (nuclear)", "ASME Section III/XI", "IATF 16949 (auto)"],
    asnt="ASNT Tennessee Valley Section",
    sites=[
        {"name": "TVA Sequoyah Nuclear", "type": "nuclear-power", "scale": "2,200 MW (2 PWRs)"},
        {"name": "TVA Watts Bar Nuclear", "type": "nuclear-power", "scale": "2,300 MW (2 PWRs — Unit 2 newest US reactor pre-Vogtle 3)"},
        {"name": "Volkswagen Chattanooga", "type": "auto", "scale": "Atlas + ID.4 EV production"},
    ],
    angles=["TVA Sequoyah + Watts Bar — major commercial nuclear inspection scope",
        "ASME Section XI ISI (in-service inspection) is dominant credential",
        "VW EV production drives battery NDT scope"],
    near=["Knoxville (180km)", "Atlanta (190km)", "Nashville (220km)"],
)

std_us("lynchburg-va", "Lynchburg, VA", "Virginia", "VA",
    tier=3, region="south-atlantic", pop=265000,
    industries=[
        {"name": "Nuclear Manufacturing", "weight": 0.55, "context": "BWXT (naval nuclear), Framatome (commercial nuclear)"},
    ],
    employers=["BWXT Lynchburg (formerly Babcock & Wilcox)",
        "Framatome Lynchburg", "Areva NP legacy"],
    wage=(58000, 82000, 128000), col=84, mult=1.05, api=False,
    codes=["NRC 10 CFR 50/70", "ASME Section III/XI",
        "NAVSEA NIM (Nuclear Inspection Manual)"],
    asnt="ASNT Virginia Section",
    sites=[
        {"name": "BWXT Lynchburg", "type": "nuclear-naval", "scale": "Sole US naval reactor manufacturer"},
        {"name": "Framatome Lynchburg", "type": "nuclear-commercial", "scale": "Reactor + steam generator components"},
    ],
    angles=["BWXT — sole US manufacturer of naval nuclear reactor components",
        "Framatome — commercial nuclear steam generator + reactor internals",
        "Highest-rigor nuclear NDT in US — naval + commercial"],
    near=["Roanoke (90km)", "Richmond (180km)", "Charlotte (260km)"],
)

std_us("monroeville-pa", "Monroeville, PA", "Pennsylvania", "PA",
    tier=3, region="appalachia", pop=28000,
    industries=[
        {"name": "Nuclear (Westinghouse)", "weight": 0.65, "context": "Westinghouse Cranberry Township HQ + Monroeville lab"},
    ],
    employers=["Westinghouse Electric (HQ Cranberry Township)",
        "Bechtel Pittsburgh", "AECOM"],
    wage=(58000, 82000, 128000), col=88, mult=1.10, api=False,
    codes=["NRC 10 CFR 50", "ASME Section III/XI", "10 CFR 21"],
    asnt="ASNT Pittsburgh Section",
    sites=[
        {"name": "Westinghouse HQ (Cranberry Township)", "type": "nuclear-r&d", "scale": "AP1000 reactor design + R&D"},
    ],
    angles=["Westinghouse — designer of AP1000 reactors (Vogtle 3+4, China, India)",
        "Reactor vessel + steam generator design originate here",
        "Pittsburgh-area nuclear engineering hub"],
    near=["Pittsburgh (20km)", "Steubenville (60km)"],
)

std_us("rochester-ny", "Rochester, NY", "New York", "NY",
    tier=3, region="northeast", pop=1080000,
    industries=[
        {"name": "Optics & Imaging", "weight": 0.25, "context": "Eastman Kodak (legacy), L3Harris, Bausch & Lomb"},
        {"name": "Manufacturing", "weight": 0.20, "context": "Xerox (legacy HQ), Constellation Brands"},
        {"name": "Nuclear (Ginna)", "weight": 0.15, "context": "Ginna Nuclear Plant 30km east"},
    ],
    employers=["L3Harris Communication Systems", "Eastman Kodak", "Bausch & Lomb",
        "Xerox", "Constellation Energy Ginna"],
    wage=(50000, 70000, 108000), col=86, mult=1.00, api=False,
    codes=["10 CFR 50 (Ginna)", "AS9100", "ASME"],
    asnt="ASNT Rochester Section",
    sites=[
        {"name": "Ginna Nuclear Plant", "type": "nuclear-power", "scale": "582 MW PWR (one of oldest US plants)"},
        {"name": "L3Harris Rochester", "type": "defense", "scale": "Tactical radio + comm systems"},
    ],
    angles=["Ginna is oldest operating US PWR — extensive aging-management inspection",
        "L3Harris communications systems — defense electronics",
        "Optics manufacturing — surface roughness inspection (interferometry)"],
    near=["Buffalo (110km)", "Syracuse (140km)"],
)

std_us("buffalo-ny", "Buffalo, NY", "New York", "NY",
    tier=3, region="northeast", pop=1130000,
    industries=[
        {"name": "Steel & Heavy Manufacturing", "weight": 0.30, "context": "Tonawanda Coke (closed), GM Tonawanda Engine"},
        {"name": "Chemicals", "weight": 0.22, "context": "Praxair-Linde, DuPont Yerkes"},
        {"name": "Auto", "weight": 0.18, "context": "Ford Stamping Plant"},
    ],
    employers=["GM Tonawanda Engine", "Praxair-Linde",
        "DuPont Yerkes", "Ford Buffalo Stamping"],
    wage=(50000, 70000, 108000), col=82, mult=1.00, api=False,
    codes=["NY DEC", "API 510/570/653", "ASME"],
    asnt="ASNT Western NY Section",
    sites=[
        {"name": "GM Tonawanda Engine", "type": "auto", "scale": "Engine block + head manufacturing"},
        {"name": "Praxair-Linde Tonawanda", "type": "industrial-gas", "scale": "Major US air separation site"},
    ],
    angles=["Industrial gas plant inspection — cryogenic vessel UT specialty",
        "Niagara Falls hydropower — turbine + draft tube inspection",
        "GM Tonawanda — major engine cast iron RT"],
    near=["Rochester (110km)", "Niagara Falls (35km)", "Toronto (150km)"],
)

# ==========================================================================
# Mid-size US cities — completing the set
# ==========================================================================

std_us("birmingham-al", "Birmingham, AL", "Alabama", "AL",
    tier=2, region="southeast", pop=1115000,
    industries=[
        {"name": "Steel", "weight": 0.30, "context": "U.S. Steel Fairfield, U.S. Pipe (legacy), Outokumpu"},
        {"name": "Healthcare", "weight": 0.20, "context": "UAB Health System"},
        {"name": "Auto", "weight": 0.18, "context": "Mercedes-Benz Tuscaloosa, Honda Lincoln (regional)"},
    ],
    employers=["U.S. Steel Fairfield Works", "U.S. Pipe & Foundry",
        "Outokumpu Calvert", "Mercedes-Benz Tuscaloosa", "ACIPCO Pipe"],
    wage=(50000, 70000, 108000), col=80, mult=1.00, api=False,
    codes=["ADEM", "API 5L (line pipe)", "AISI", "ASTM"],
    asnt="ASNT Alabama Section",
    sites=[
        {"name": "U.S. Steel Fairfield Works", "type": "steel", "scale": "Major US flat steel + tubular"},
        {"name": "ACIPCO", "type": "iron-pipe", "scale": "Largest ductile iron pipe plant in US"},
    ],
    angles=["Birmingham steel/iron heritage — multiple mills + foundries",
        "ACIPCO ductile iron pipe — UT thickness gauging on cast wall",
        "Mercedes-Benz Tuscaloosa drives auto inspection scope (90km away)"],
    near=["Atlanta (240km)", "Nashville (290km)", "Mobile (470km)"],
)

std_us("st-louis-mo", "St. Louis, MO", "Missouri", "MO",
    tier=2, region="midwest", pop=2820000,
    industries=[
        {"name": "Aerospace & Defense", "weight": 0.32, "context": "Boeing Defense (F/A-18, F-15EX, T-7A)"},
        {"name": "Brewing & Food", "weight": 0.22, "context": "AB-InBev HQ, Nestle Purina"},
        {"name": "Refining", "weight": 0.10, "context": "P66 Wood River Refinery (40km east)"},
    ],
    employers=["Boeing Defense Space & Security HQ",
        "AB-InBev North America HQ", "Phillips 66 Wood River Refinery (40km)",
        "Express Scripts", "Emerson Electric HQ"],
    wage=(54000, 76000, 116000), col=86, mult=1.00, api=True,
    codes=["AS9100", "Nadcap NDT", "MIL-STD-2154", "API 510/570/653"],
    asnt="ASNT St. Louis Section",
    sites=[
        {"name": "Boeing Defense St. Louis", "type": "aerospace-defense", "scale": "F-15EX, F/A-18, T-7A, 777X tail"},
        {"name": "Phillips 66 Wood River Refinery", "type": "refinery", "scale": "356,000 bpd (40km east in IL)"},
    ],
    angles=["Boeing Defense HQ — F-15EX + F/A-18 + T-7A trainer production",
        "Anheuser-Busch SS welding (food contact, 3-A Sanitary)",
        "Wood River Refinery is major Midwest crude processor"],
    near=["Kansas City (385km)", "Indianapolis (400km)", "Chicago (475km)"],
)

std_us("milwaukee-wi", "Milwaukee, WI", "Wisconsin", "WI",
    tier=2, region="midwest", pop=1570000,
    industries=[
        {"name": "Heavy Manufacturing", "weight": 0.30, "context": "Rockwell Automation HQ, Harley-Davidson HQ, GE Healthcare"},
        {"name": "Power Generation Equipment", "weight": 0.20, "context": "P&H Mining Equipment (now Komatsu), Caterpillar"},
    ],
    employers=["Rockwell Automation HQ", "Harley-Davidson HQ", "GE Healthcare HQ (Waukesha)",
        "Komatsu Mining", "Briggs & Stratton"],
    wage=(52000, 72000, 110000), col=84, mult=1.00, api=False,
    codes=["IATF 16949", "ASME Section V/VIII", "FDA (medical devices)"],
    asnt="ASNT Milwaukee Section",
    sites=[
        {"name": "GE Healthcare Waukesha", "type": "medical-devices", "scale": "MRI + CT scanner manufacturing HQ"},
        {"name": "Komatsu Mining (P&H)", "type": "mining-equipment", "scale": "Electric mining shovels, draglines"},
    ],
    angles=["GE Healthcare Waukesha — MRI/CT scanner NDT (cryostat helium leak, magnet weld)",
        "Mining shovel boom NDT — high-cycle fatigue UT/MT",
        "Harley-Davidson engine castings — RT for porosity"],
    near=["Chicago (140km)", "Madison (130km)", "Green Bay (190km)"],
)

std_us("minneapolis-mn", "Minneapolis, MN", "Minnesota", "MN",
    tier=2, region="upper-midwest", pop=3690000,
    industries=[
        {"name": "Industrial Manufacturing", "weight": 0.28, "context": "3M HQ, Polaris, Pentair, Honeywell Aerospace"},
        {"name": "Refining", "weight": 0.18, "context": "Flint Hills Pine Bend, Marathon St. Paul Park"},
        {"name": "Medical Devices", "weight": 0.18, "context": "Medtronic HQ, Boston Scientific"},
    ],
    employers=["3M HQ (Maplewood)", "Polaris Industries", "Honeywell Aerospace Minneapolis",
        "Medtronic HQ", "Flint Hills Pine Bend Refinery", "Marathon St. Paul Park Refinery"],
    wage=(54000, 76000, 116000), col=92, mult=1.00, api=True,
    codes=["MN PCA", "API 510/570/653", "AS9100", "FDA medical devices"],
    asnt="ASNT Twin Cities Section",
    sites=[
        {"name": "Flint Hills Pine Bend Refinery", "type": "refinery", "scale": "375,000 bpd"},
        {"name": "Marathon St. Paul Park", "type": "refinery", "scale": "98,000 bpd"},
        {"name": "Medtronic HQ Minneapolis", "type": "medical", "scale": "World's largest medical device company"},
    ],
    angles=["Pine Bend is largest Midwestern refinery serving Minnesota + Dakotas",
        "Medtronic — implantable device NDT (Ti weld, hermetic seal leak)",
        "3M industrial process inspection scope"],
    near=["St. Paul (15km)", "Duluth (250km)", "Fargo (390km)"],
)

std_us("duluth-mn", "Duluth, MN", "Minnesota", "MN",
    tier=3, region="upper-midwest", pop=290000,
    industries=[
        {"name": "Iron Ore Shipping", "weight": 0.42, "context": "Port of Duluth — largest US Great Lakes port; iron ore export"},
        {"name": "Power", "weight": 0.18, "context": "Minnesota Power generation"},
        {"name": "Shipbuilding (legacy)", "weight": 0.12, "context": "Fraser Shipyards"},
    ],
    employers=["U.S. Steel Minntac (Mountain Iron MN)", "Cliffs Hibbing Taconite",
        "Fraser Shipyards Duluth", "Minnesota Power"],
    wage=(50000, 70000, 108000), col=82, mult=1.00, api=False,
    codes=["MN PCA", "MSHA (mining)", "USCG (Great Lakes)"],
    asnt="ASNT Twin Ports/Northeastern MN",
    sites=[
        {"name": "Port of Duluth-Superior", "type": "port", "scale": "Largest US Great Lakes port"},
        {"name": "Iron Range mines (regional)", "type": "mine", "scale": "Mesabi Range — major US iron ore"},
    ],
    angles=["Great Lakes ore boats — UT thickness gauging on cargo holds",
        "Iron Range taconite plants (Minntac, Hibbing) — pelletizing inspection",
        "Cold-weather Great Lakes operations"],
    near=["Minneapolis (250km)", "Winnipeg (440km)"],
)

std_us("el-paso-tx", "El Paso, TX", "Texas", "TX",
    tier=2, region="southwest", pop=870000,
    industries=[
        {"name": "Refining", "weight": 0.30, "context": "Marathon El Paso Refinery"},
        {"name": "Defense", "weight": 0.22, "context": "Fort Bliss + Biggs Army Airfield"},
        {"name": "Border Logistics", "weight": 0.15, "context": "Major US-Mexico trade corridor"},
    ],
    employers=["Marathon El Paso Refinery", "Fort Bliss",
        "Western Refining Pipeline (now MPC)"],
    wage=(50000, 70000, 108000), col=82, mult=1.00, api=False,
    codes=["TPSC", "TCEQ", "API 510/570/653", "Mil-Spec (Fort Bliss)"],
    asnt="ASNT West Texas/Southern NM",
    sites=[
        {"name": "Marathon El Paso Refinery", "type": "refinery", "scale": "133,000 bpd"},
        {"name": "Fort Bliss", "type": "military", "scale": "Largest mounted formation Army post"},
    ],
    angles=["Border-area refinery — serves NM + Mexico fuel markets",
        "Permian crude takeaway pipelines terminate near El Paso",
        "Fort Bliss aviation maintenance"],
    near=["Las Cruces NM (75km)", "Albuquerque (430km)", "Odessa (450km)"],
)

std_us("el-dorado-ar", "El Dorado, AR", "Arkansas", "AR",
    tier=3, region="south-central", pop=18000,
    industries=[
        {"name": "Refining", "weight": 0.55, "context": "Lion Oil Refinery — 80,000 bpd"},
        {"name": "Chemicals", "weight": 0.22, "context": "Great Lakes Chemical, Albemarle bromine"},
    ],
    employers=["Lion Oil Refinery", "Albemarle El Dorado",
        "Great Lakes Chemical (LANXESS)"],
    wage=(54000, 76000, 116000), col=78, mult=1.00, api=False,
    codes=["AR DEQ", "API 510/570/653", "ASME"],
    asnt="ASNT Arkansas Section",
    sites=[
        {"name": "Lion Oil Refinery", "type": "refinery", "scale": "80,000 bpd"},
        {"name": "Albemarle bromine plant", "type": "chemical", "scale": "Major US bromine producer"},
    ],
    angles=["Lion Oil — small refinery, every TAR is high-impact",
        "Bromine production — wet bromine corrosion inspection (Hastelloy)",
        "South Arkansas oil/gas legacy region"],
    near=["Little Rock (200km)", "Shreveport LA (140km)"],
)

std_us("bartlesville-ok", "Bartlesville, OK", "Oklahoma", "OK",
    tier=3, region="south-central", pop=37000,
    industries=[
        {"name": "Energy HQ Heritage", "weight": 0.55, "context": "Phillips 66 (legacy HQ), ConocoPhillips, Frontier Oil legacy"},
    ],
    employers=["Phillips 66 (Research + tech ops)", "ConocoPhillips legacy ops",
        "Diversified Energy"],
    wage=(54000, 76000, 116000), col=78, mult=1.00, api=False,
    codes=["OK Corporation Commission", "API 510/570/653", "ASME"],
    asnt="ASNT Oklahoma Section",
    sites=[
        {"name": "Phillips 66 Research Center", "type": "r&d", "scale": "Major refining + chemicals R&D"},
    ],
    angles=["Phillips 66 R&D centre — refining technology development",
        "Birthplace of Phillips Petroleum — historical industry heritage",
        "Mid-Continent oil regional inspection scope"],
    near=["Tulsa (75km)", "Oklahoma City (220km)"],
)

# ==========================================================================
# Remaining cities — minimal but unique
# ==========================================================================

std_us("decatur-il", "Decatur, IL", "Illinois", "IL",
    tier=3, region="midwest", pop=104000,
    industries=[
        {"name": "Heavy Manufacturing", "weight": 0.40, "context": "Caterpillar, ADM"},
        {"name": "Agribusiness", "weight": 0.25, "context": "ADM corn processing — largest in world"},
    ],
    employers=["Caterpillar Decatur", "ADM (Archer Daniels Midland) HQ", "Tate & Lyle"],
    wage=(50000, 70000, 108000), col=78, mult=1.00, api=False,
    codes=["IL EPA", "FDA food contact", "ASME"],
    asnt="ASNT Central Illinois",
    sites=[{"name": "ADM Decatur", "type": "agribusiness", "scale": "Largest corn processing plant in world"},
        {"name": "Caterpillar Decatur", "type": "heavy-equip", "scale": "Off-highway truck assembly"}],
    angles=["ADM Decatur — sterile food-grade SS welding inspection",
        "Caterpillar truck frame UT (high-cycle fatigue)",
        "Ethanol production NDT — distillation column scope"],
    near=["Springfield IL (60km)", "St Louis (220km)", "Indianapolis (250km)"],
)

std_us("peoria-il", "Peoria, IL", "Illinois", "IL",
    tier=3, region="midwest", pop=400000,
    industries=[
        {"name": "Heavy Equipment (Caterpillar)", "weight": 0.65, "context": "Caterpillar HQ + multiple plants"},
    ],
    employers=["Caterpillar HQ", "Komatsu", "RLI Corporation"],
    wage=(50000, 70000, 108000), col=78, mult=1.00, api=False,
    codes=["IL EPA", "ASME", "ASTM"],
    asnt="ASNT Central Illinois",
    sites=[{"name": "Caterpillar Mossville", "type": "heavy-equip", "scale": "Engine + transmission HQ"}],
    angles=["Caterpillar HQ region — heavy-equipment frame, axle, engine NDT",
        "Diesel engine block RT for porosity",
        "Hydraulic cylinder UT (rod welds, end caps)"],
    near=["Chicago (270km)", "Springfield IL (110km)"],
)

std_us("erie-pa", "Erie, PA", "Pennsylvania", "PA",
    tier=3, region="appalachia", pop=270000,
    industries=[
        {"name": "Heavy Manufacturing", "weight": 0.42, "context": "Wabtec (formerly GE Locomotive)"},
        {"name": "Insurance", "weight": 0.20, "context": "Erie Insurance HQ"},
    ],
    employers=["Wabtec Erie (Locomotive Plant)", "Erie Insurance HQ", "Lord Corporation"],
    wage=(50000, 70000, 108000), col=78, mult=1.00, api=False,
    codes=["PA DEP", "AAR (Association of American Railroads)", "ASME"],
    asnt="ASNT Erie Section",
    sites=[{"name": "Wabtec Erie", "type": "rail", "scale": "Major US locomotive manufacturing"}],
    angles=["Wabtec Erie — major US locomotive manufacturing (former GE Transportation)",
        "Locomotive frame UT, axle inspection, traction motor",
        "Lord Corporation — composite + adhesive bond NDT"],
    near=["Cleveland (160km)", "Pittsburgh (200km)", "Buffalo (170km)"],
)

std_us("columbus-oh", "Columbus, OH", "Ohio", "OH",
    tier=2, region="midwest", pop=2150000,
    industries=[
        {"name": "Auto", "weight": 0.30, "context": "Honda Marysville/Anna nearby; Intel Ohio fab building"},
        {"name": "R&D / Battelle", "weight": 0.22, "context": "Battelle Memorial Institute — largest US R&D org"},
        {"name": "Aerospace", "weight": 0.15, "context": "Rickenbacker AFB"},
    ],
    employers=["Honda Marysville/Anna", "Intel Ohio (under construction)",
        "Battelle Memorial Institute", "JPMorgan Chase Columbus"],
    wage=(52000, 72000, 110000), col=82, mult=1.00, api=False,
    codes=["Ohio EPA", "IATF 16949", "AS9100"],
    asnt="ASNT Columbus Section",
    sites=[
        {"name": "Battelle Memorial Institute", "type": "r&d", "scale": "Largest US private R&D org"},
        {"name": "Intel Ohio (under construction)", "type": "semi", "scale": "Major US semiconductor fab"},
    ],
    angles=["Battelle — major NDT R&D centre, ASNT publishing partner",
        "Intel Ohio fab construction — UHP gas line + structural NDT scope",
        "Honda regional auto plants drive ongoing scope"],
    near=["Cincinnati (170km)", "Cleveland (220km)", "Pittsburgh (300km)"],
)

# Sort the rest into compact one-liners
for slug, fields in [
    ("hartford-ct", None),  # already added above
]:
    if fields:
        add(slug, **fields)


# ==========================================================================
# Remaining cities — abbreviated entries (still unique-data)
# ==========================================================================

std_us("milwaukee-wi", None,None,None) if False else None  # already added

remaining = [
    ("nashville-tn",), ("memphis-tn",), ("milwaukee-wi",), ("minneapolis-mn",),  # already added above
]

# Catch the rest with focused unique data
std_us("long-beach-ca", "Long Beach, CA", "California", "CA",
    tier=2, region="west-coast", pop=460000,
    industries=[{"name": "Refining + Port", "weight": 0.50, "context": "Phillips 66 Carson, ExxonMobil Torrance, Port of Long Beach"}],
    employers=["Phillips 66 Carson Refinery", "Marathon Carson Refinery (former Tesoro)",
        "ExxonMobil Torrance", "Port of Long Beach"],
    wage=(62000, 86000, 132000), col=130, mult=1.20,
    codes=["CARB Air Permits", "Cal/OSHA Title 8", "API 510/570/653"],
    sites=[{"name": "Phillips 66 Carson", "type": "refinery", "scale": "139,000 bpd"},
        {"name": "Port of Long Beach", "type": "port", "scale": "2nd busiest US container port"}],
    angles=["Tightest US air emission controls (CARB + SCAQMD)",
        "California Cal/OSHA Title 8 stricter than federal OSHA",
        "Port + 4 refineries within 30km — densest US west-coast cluster"],
    near=["Los Angeles (35km)", "San Diego (170km)"],
)

std_us("sacramento-ca", "Sacramento, CA", "California", "CA",
    tier=3, region="west-coast", pop=2410000,
    industries=[{"name": "Defense + Government", "weight": 0.40, "context": "McClellan AFB legacy; Aerojet Rocketdyne Rancho Cordova"}],
    employers=["Aerojet Rocketdyne Rancho Cordova", "VSP Vision",
        "Sutter Health", "Sacramento Municipal Utility District"],
    wage=(58000, 80000, 124000), col=120, mult=1.10,
    codes=["Cal/OSHA Title 8", "ASME"],
    sites=[{"name": "Aerojet Rocketdyne Rancho Cordova", "type": "aerospace", "scale": "RS-25 + RL10 + AR1 engine work"}],
    angles=["Aerojet Rocketdyne RS-25 (SLS) + RL10 engines",
        "California-specific stricter inspection regulations",
        "Solar/wind power inspection growing scope"],
    near=["San Francisco (140km)", "Reno NV (210km)"],
)

std_us("reno-nv", "Reno, NV", "Nevada", "NV",
    tier=3, region="west-coast", pop=515000,
    industries=[
        {"name": "EV Manufacturing", "weight": 0.35, "context": "Tesla Gigafactory + Panasonic battery"},
        {"name": "Aerospace", "weight": 0.18, "context": "Sierra Nevada Corporation"},
    ],
    employers=["Tesla Gigafactory Nevada", "Panasonic Energy",
        "Sierra Nevada Corporation"],
    wage=(56000, 78000, 122000), col=98, mult=1.05,
    codes=["NV DEP", "AS9100", "IATF 16949"],
    sites=[{"name": "Tesla Gigafactory", "type": "battery", "scale": "Largest EV battery factory globally"}],
    angles=["Tesla Gigafactory — largest EV battery factory; battery cell laser weld inspection",
        "Sierra Nevada — Dream Chaser spacecraft, ISR aircraft",
        "Mining inspection scope (Nevada gold mines regional)"],
    near=["Sacramento (210km)", "Las Vegas (700km)"],
)

std_us("spokane-wa", "Spokane, WA", "Washington", "WA",
    tier=3, region="west-coast", pop=560000,
    industries=[
        {"name": "Aluminum & Aerospace", "weight": 0.40, "context": "Kaiser Aluminum Trentwood, Boeing Spokane"},
    ],
    employers=["Kaiser Aluminum Trentwood", "Boeing Spokane (former Triumph)",
        "Avista Corporation"],
    wage=(54000, 76000, 116000), col=86, mult=1.00,
    codes=["WA Ecology", "AS9100", "Nadcap"],
    sites=[{"name": "Kaiser Trentwood", "type": "aluminum", "scale": "Major US aerospace aluminum plate"},
        {"name": "Boeing Spokane", "type": "aerospace", "scale": "787 floor structure + composite parts"}],
    angles=["Kaiser Trentwood — aerospace aluminum plate UT + ECT",
        "Boeing Spokane composite NDT for 787 floor",
        "Hydropower equipment inspection (Avista, BPA)"],
    near=["Seattle (450km)", "Portland (570km)", "Boise (610km)"],
)

std_us("tacoma-wa", "Tacoma, WA", "Washington", "WA",
    tier=3, region="west-coast", pop=920000,
    industries=[{"name": "Port + Manufacturing", "weight": 0.45, "context": "Port of Tacoma, Boeing nearby"}],
    employers=["Port of Tacoma", "Joint Base Lewis-McChord",
        "Boeing Auburn (regional)"],
    wage=(58000, 80000, 124000), col=110, mult=1.10,
    codes=["WA Ecology", "AS9100"],
    sites=[{"name": "Port of Tacoma", "type": "port", "scale": "Major US west-coast container port"}],
    angles=["Port + Joint Base Lewis-McChord military aviation MRO",
        "Pacific Northwest Cascade aerospace cluster",
        "Boeing Auburn machined parts NDT"],
    near=["Seattle (50km)", "Olympia (50km)"],
)

# Finishing-touch cities (still unique scope)
for slug, name, state, sc, top_ind, top_emp in [
    ("tucson-az", "Tucson, AZ", "Arizona", "AZ", "Raytheon missile manufacturing", "Raytheon Missiles & Defense"),
    ("memphis-tn", "Memphis, TN", "Tennessee", "TN", "FedEx aviation hub + auto", "FedEx World Hub"),
    ("nashville-tn", "Nashville, TN", "Tennessee", "TN", "Auto + healthcare", "Nissan Smyrna"),
    ("milwaukee-wi", "Milwaukee, WI", "Wisconsin", "WI", "Mining equipment + medical", "GE Healthcare Waukesha"),
    ("minneapolis-mn", "Minneapolis, MN", "Minnesota", "MN", "Refining + medical devices", "Flint Hills Pine Bend"),
    ("hartford-ct", "Hartford, CT", "Connecticut", "CT", "Pratt & Whitney aerospace", "Pratt & Whitney"),
]:
    if slug in CITIES:
        continue  # already added with full data

# Add remaining cities with smaller footprint — ALL using std_us pattern
std_us("tucson-az", "Tucson, AZ", "Arizona", "AZ",
    tier=2, region="southwest", pop=1050000,
    industries=[
        {"name": "Defense Manufacturing", "weight": 0.45, "context": "Raytheon Missiles & Defense — Tucson is missile capital of US"},
        {"name": "Aviation MRO + Boneyard", "weight": 0.20, "context": "Davis-Monthan AFB AMARG ('Boneyard')"},
    ],
    employers=["Raytheon Missiles & Defense Tucson",
        "Davis-Monthan AFB", "Bombardier Tucson Service Centre"],
    wage=(56000, 78000, 122000), col=88, mult=1.05, api=False,
    codes=["MIL-STD-2154", "AS9100", "Nadcap NDT"],
    asnt="ASNT Arizona Section",
    sites=[
        {"name": "Raytheon Tucson", "type": "defense", "scale": "Major US missile manufacturer — Tomahawk, Standard, AMRAAM"},
        {"name": "Davis-Monthan AFB AMARG", "type": "military", "scale": "World's largest aircraft storage facility"},
    ],
    angles=["Raytheon — primary US tactical missile manufacturer",
        "AMARG 'Boneyard' — long-term aircraft storage NDT for re-deployment",
        "Composite + propellant tank NDT"],
    near=["Phoenix (190km)", "El Paso TX (510km)"],
)

# Newer / not as well-defined ones
std_us("richmond-va", "Richmond, VA", "Virginia", "VA",
    tier=3, region="south-atlantic", pop=1320000,
    industries=[{"name": "Government + Tobacco", "weight": 0.32, "context": "Altria HQ, Federal Reserve Bank, Capital One"}],
    employers=["Altria Group HQ", "Capital One HQ", "Dominion Energy",
        "Honeywell Hopewell (50km)"],
    wage=(50000, 70000, 108000), col=88, mult=1.00,
    codes=["VA DEQ", "API 510/570/653", "ASME"],
    sites=[{"name": "Honeywell Hopewell", "type": "chemical", "scale": "Caprolactam + nylon resin"}],
    angles=["Honeywell Hopewell caprolactam — nylon manufacturing inspection",
        "Dominion Energy nuclear plants (Surry, North Anna) regional",
        "VCU + state agency procurement scope"],
    near=["Norfolk (170km)", "Washington DC (170km)"],
)

std_us("pensacola-fl", "Pensacola, FL", "Florida", "FL",
    tier=3, region="southeast", pop=510000,
    industries=[
        {"name": "Naval Aviation", "weight": 0.55, "context": "NAS Pensacola — naval aviation training"},
        {"name": "MRO", "weight": 0.15, "context": "ST Engineering MRO at Pensacola"},
    ],
    employers=["NAS Pensacola", "ST Engineering MRO Pensacola",
        "International Paper"],
    wage=(50000, 70000, 108000), col=82, mult=1.00,
    codes=["NAVAIR Tech Pubs", "Mil-Spec NDT", "FAA Part 145"],
    asnt="ASNT Florida Panhandle",
    sites=[{"name": "NAS Pensacola", "type": "naval-aviation", "scale": "Naval flight school + Blue Angels"},
        {"name": "ST Engineering MRO", "type": "aviation-mro", "scale": "Heavy maintenance for commercial aircraft"}],
    angles=["NAS Pensacola — Naval flight training (T-6 Texan, T-45 Goshawk)",
        "ST Engineering Pensacola — large-aircraft heavy MRO",
        "Coastal hurricane resilience scope"],
    near=["Mobile AL (90km)", "New Orleans (320km)"],
)

# Catch-all for less-known cities
catch_all = [
    ("buffalo-ny",), ("rochester-ny",),  # already added
]

std_us("youngstown-oh", None, None, None) if "youngstown-oh" in CITIES else None

std_us("cape-canaveral-fl", None, None, None) if "cape-canaveral-fl" in CITIES else None

# Final remaining short entries
final_cities = [
    ("chattanooga-tn", None, None, None),  # already added
]


def main():
    repo_root = Path(__file__).resolve().parent.parent
    out = repo_root / "data" / "cities-batch4-us-mixed.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(CITIES, indent=2, ensure_ascii=False))
    print(f"Wrote {len(CITIES)} cities to {out}")


if __name__ == "__main__":
    main()
