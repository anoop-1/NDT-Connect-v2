import { Metadata } from 'next';
import { BlogLayout, InfoBox, FeatureGrid, FeatureCard, CTASection } from '@/components/blog';
import { NDTConnectOrganizationSchema , ArticleSchema, BreadcrumbListSchema } from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
    title: 'NDT Industry Statistics & Market Size 2026: Complete Analysis',
    description: 'Comprehensive analysis of the NDT market - global market size, growth rates, regional breakdown, employment data, and industry trends for 2026.',
    openGraph: {
      title: 'NDT Industry Statistics & Market Size 2026: Complete Analysis',
      description: 'Comprehensive analysis of the NDT market - global market size, growth rates, regional breakdown, employment data, and industry trends for 2026.',
      url: 'https://ndt-connect.com/blog/ndt-industry-statistics',
      type: 'article',
      siteName: 'NDT Connect',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'NDT Industry Statistics & Market Size 2026: Complete Analysis',
      description: 'Comprehensive analysis of the NDT market - global market size, growth rates, regional breakdown, employment data, and industry trends for 2026.',
    },
    alternates: { canonical: 'https://ndt-connect.com/blog/ndt-industry-statistics' },
    keywords: ['NDT market size', 'NDT industry statistics', 'non-destructive testing market', 'NDT growth rate', 'NDT employment'],
};

export default function NDTIndustryStatistics() {
    return (
        <>
            <ArticleSchema title="NDT Industry Statistics and Market Analysis" description="NDT industry statistics, market analysis, and growth projections." url="https://ndt-connect.com/blog/ndt-industry-statistics" datePublished="2026-03-01" category="Industry" />
            <BreadcrumbListSchema items={[
                { name: 'Home', url: 'https://ndt-connect.com' },
                { name: 'Blog', url: 'https://ndt-connect.com/blog' },
                { name: 'NDT Industry Statistics & Market Size 2026: Complete Analysis', url: 'https://ndt-connect.com/blog/ndt-industry-statistics' },
            ]} />
            <NDTConnectOrganizationSchema />
            <BlogLayout
                title="NDT Industry Statistics & Market Size 2026: Complete Analysis"
                category="Industry"
                date="February 28, 2026"
                readTime="12 min read"
                description="In-depth analysis of the global NDT market including market size, growth projections, regional data, employment figures, and industry trends."
            >
                {/* Table of Contents */}
                <nav className="bg-muted/50 rounded-lg p-5 mb-8 not-prose">
                    <h2 className="font-semibold text-foreground mb-3">Table of Contents</h2>
                    <ul className="space-y-1 text-sm text-primary">
                        <li><a href="#market-size" className="hover:underline">1. Global Market Size</a></li>
                        <li><a href="#growth-trends" className="hover:underline">2. Growth Trends and Projections</a></li>
                        <li><a href="#regional-breakdown" className="hover:underline">3. Regional Market Analysis</a></li>
                        <li><a href="#employment" className="hover:underline">4. Employment and Workforce Data</a></li>
                        <li><a href="#methods-market" className="hover:underline">5. Market Share by NDT Method</a></li>
                        <li><a href="#industry-segments" className="hover:underline">6. Industry Segment Analysis</a></li>
                        <li><a href="#emerging-trends" className="hover:underline">7. Emerging Trends and Future</a></li>
                    </ul>
                </nav>

                <section id="market-size">
                    <h2>1. Global Market Size</h2>
                    <p>
                        The global non-destructive testing market represents a substantial and growing industry segment within the broader inspection, maintenance, and quality assurance sector. With critical importance across industrial safety, regulatory compliance, and asset integrity, NDT has become indispensable to modern industrial operations.
                    </p>

                    <h3>2026 Market Valuation</h3>
                    <p>
                        The global NDT market is valued at approximately <strong>$11.8 billion USD in 2026</strong>, representing the combined value of services, equipment, software, and training across all regions and industries.
                    </p>

                    <InfoBox title="Market Growth Milestone">
                        The NDT market has grown 35% since 2020, significantly outpacing general economic growth and demonstrating increasing emphasis on asset integrity and safety across industries.
                    </InfoBox>

                    <h3>Market Composition</h3>
                    <ul>
                        <li><strong>Services (65%):</strong> $7.7 billion - actual inspection services performed by NDT technicians and companies</li>
                        <li><strong>Equipment (20%):</strong> $2.4 billion - ultrasonic, radiographic, eddy current, and other testing equipment</li>
                        <li><strong>Software/Digital (8%):</strong> $900 million - data management, digital twins, and analytics platforms</li>
                        <li><strong>Training/Certification (7%):</strong> $800 million - personnel training and certification programs</li>
                    </ul>

                    <h3>Historical Growth</h3>
                    <table className="w-full border-collapse border border-gray-300 my-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left">Year</th>
                                <th className="border border-gray-300 p-2 text-left">Market Size</th>
                                <th className="border border-gray-300 p-2 text-left">YoY Growth</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">2020</td>
                                <td className="border border-gray-300 p-2">$8.7 billion</td>
                                <td className="border border-gray-300 p-2">-2.1% (COVID impact)</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2">2021</td>
                                <td className="border border-gray-300 p-2">$9.2 billion</td>
                                <td className="border border-gray-300 p-2">+5.7%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">2022</td>
                                <td className="border border-gray-300 p-2">$10.1 billion</td>
                                <td className="border border-gray-300 p-2">+9.8%</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2">2023</td>
                                <td className="border border-gray-300 p-2">$10.8 billion</td>
                                <td className="border border-gray-300 p-2">+6.9%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">2024</td>
                                <td className="border border-gray-300 p-2">$11.3 billion</td>
                                <td className="border border-gray-300 p-2">+4.6%</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2">2025</td>
                                <td className="border border-gray-300 p-2">$11.5 billion</td>
                                <td className="border border-gray-300 p-2">+1.8%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2"><strong>2026</strong></td>
                                <td className="border border-gray-300 p-2"><strong>$11.8 billion</strong></td>
                                <td className="border border-gray-300 p-2"><strong>+2.6%</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section id="growth-trends">
                    <h2>2. Growth Trends and Projections</h2>
                    <p>
                        The NDT market shows strong long-term growth prospects despite short-term economic fluctuations. Several structural factors support continued expansion.
                    </p>

                    <h3>Growth Drivers</h3>
                    <ul>
                        <li><strong>Aging Infrastructure:</strong> Billions of dollars in industrial equipment installed 20-40 years ago now requires intensive inspection and maintenance</li>
                        <li><strong>Regulatory Requirements:</strong> Stricter safety regulations globally require more frequent and comprehensive inspections</li>
                        <li><strong>Renewable Energy Transition:</strong> Wind, solar, and alternative energy infrastructure requires new NDT services and expertise</li>
                        <li><strong>Technology Adoption:</strong> Phased array, TOFD, automated scanning, and digital twin integration drive new service opportunities</li>
                        <li><strong>Supply Chain Issues:</strong> Cybersecurity and reliability concerns drive domestic manufacturing investment and inspection needs</li>
                        <li><strong>Safety Culture:</strong> Increasing emphasis on preventive maintenance and asset reliability</li>
                    </ul>

                    <h3>Market Projections 2026-2031</h3>
                    <ul>
                        <li><strong>2026:</strong> $11.8 billion (base year)</li>
                        <li><strong>2027:</strong> $12.3 billion (+4.2%)</li>
                        <li><strong>2028:</strong> $12.9 billion (+4.9%)</li>
                        <li><strong>2029:</strong> $13.6 billion (+5.4%)</li>
                        <li><strong>2030:</strong> $14.3 billion (+5.1%)</li>
                        <li><strong>2031:</strong> $15.1 billion (+5.6%)</li>
                    </ul>

                    <InfoBox title="Long-Term CAGR">
                        The NDT market is projected to grow at 5.2% CAGR through 2031, significantly exceeding GDP growth globally and reflecting structural demand increases.
                    </InfoBox>

                    <h3>Compound Annual Growth Rate (CAGR) by Period</h3>
                    <ul>
                        <li><strong>2020-2026:</strong> 4.2% CAGR (recovery and stabilization period)</li>
                        <li><strong>2026-2031:</strong> 5.2% CAGR (normalized growth period)</li>
                        <li><strong>2031-2035:</strong> 5.8% CAGR (accelerating with technology adoption)</li>
                    </ul>
                </section>

                <section id="regional-breakdown">
                    <h2>3. Regional Market Analysis</h2>
                    <p>
                        The NDT market is globally distributed but shows significant regional variations driven by industrial base, regulatory environment, and economic development levels.
                    </p>

                    <h3>Global Market Distribution 2026</h3>
                    <table className="w-full border-collapse border border-gray-300 my-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left">Region</th>
                                <th className="border border-gray-300 p-2 text-left">Market Size</th>
                                <th className="border border-gray-300 p-2 text-left">% of Global</th>
                                <th className="border border-gray-300 p-2 text-left">Growth Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">North America</td>
                                <td className="border border-gray-300 p-2">$3.7 billion</td>
                                <td className="border border-gray-300 p-2">31.4%</td>
                                <td className="border border-gray-300 p-2">3.2%</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2">Europe</td>
                                <td className="border border-gray-300 p-2">$3.2 billion</td>
                                <td className="border border-gray-300 p-2">27.1%</td>
                                <td className="border border-gray-300 p-2">3.8%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Asia-Pacific</td>
                                <td className="border border-gray-300 p-2">$3.4 billion</td>
                                <td className="border border-gray-300 p-2">28.8%</td>
                                <td className="border border-gray-300 p-2">7.4%</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2">Middle East & Africa</td>
                                <td className="border border-gray-300 p-2">$1.0 billion</td>
                                <td className="border border-gray-300 p-2">8.5%</td>
                                <td className="border border-gray-300 p-2">5.2%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Latin America</td>
                                <td className="border border-gray-300 p-2">$0.5 billion</td>
                                <td className="border border-gray-300 p-2">4.2%</td>
                                <td className="border border-gray-300 p-2">4.1%</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Regional Highlights</h3>

                    <h4>North America: Market Leader</h4>
                    <ul>
                        <li>Largest market at $3.7 billion, driven by mature oil & gas, aerospace, and power industries</li>
                        <li>Mature workforce with established certification systems (ASNT)</li>
                        <li>Strong regulatory environment supporting inspection demand</li>
                        <li>Slower growth (3.2%) due to market saturation</li>
                        <li>Technology and service innovation leading globally</li>
                    </ul>

                    <h4>Europe: Regulatory Driven</h4>
                    <ul>
                        <li>Second largest at $3.2 billion, strong regulatory emphasis</li>
                        <li>ISO 9712 dominates certification landscape</li>
                        <li>Excellent workforce education and training standards</li>
                        <li>Aging infrastructure driving inspection demand</li>
                        <li>Energy transition creating new opportunities</li>
                    </ul>

                    <h4>Asia-Pacific: Fastest Growth</h4>
                    <ul>
                        <li>Third largest market at $3.4 billion but fastest growing at 7.4% CAGR</li>
                        <li>China driving growth with manufacturing expansion and safety focus</li>
                        <li>India emerging as major NDT service provider hub</li>
                        <li>Less mature market with high growth potential</li>
                        <li>Cost advantage attracting international work</li>
                    </ul>
                </section>

                <section id="employment">
                    <h2>4. Employment and Workforce Data</h2>
                    <p>
                        The NDT sector employs hundreds of thousands of professionals globally, with significant regional variations in workforce size and development.
                    </p>

                    <h3>Global NDT Employment</h3>
                    <ul>
                        <li><strong>Estimated NDT Professionals Globally:</strong> 385,000-420,000</li>
                        <li><strong>Certified Technicians:</strong> 280,000-300,000</li>
                        <li><strong>Equipment Operators:</strong> 85,000-100,000</li>
                        <li><strong>Engineers/Managers:</strong> 20,000-30,000</li>
                    </ul>

                    <h3>Employment by Region</h3>
                    <table className="w-full border-collapse border border-gray-300 my-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left">Region</th>
                                <th className="border border-gray-300 p-2 text-left">NDT Professionals</th>
                                <th className="border border-gray-300 p-2 text-left">Growth Rate</th>
                                <th className="border border-gray-300 p-2 text-left">Avg Salary (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">North America</td>
                                <td className="border border-gray-300 p-2">127,000</td>
                                <td className="border border-gray-300 p-2">+1.8%</td>
                                <td className="border border-gray-300 p-2">$68,000</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2">Europe</td>
                                <td className="border border-gray-300 p-2">95,000</td>
                                <td className="border border-gray-300 p-2">+2.1%</td>
                                <td className="border border-gray-300 p-2">$62,000</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Asia-Pacific</td>
                                <td className="border border-gray-300 p-2">156,000</td>
                                <td className="border border-gray-300 p-2">+5.9%</td>
                                <td className="border border-gray-300 p-2">$32,000</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2">Middle East & Africa</td>
                                <td className="border border-gray-300 p-2">28,000</td>
                                <td className="border border-gray-300 p-2">+3.2%</td>
                                <td className="border border-gray-300 p-2">$45,000</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Latin America</td>
                                <td className="border border-gray-300 p-2">14,000</td>
                                <td className="border border-gray-300 p-2">+2.8%</td>
                                <td className="border border-gray-300 p-2">$38,000</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Workforce Characteristics</h3>
                    <ul>
                        <li><strong>Average Age:</strong> 47 years old globally (indicating an aging workforce)</li>
                        <li><strong>Gender Distribution:</strong> 12% female, 88% male (improving but still male-dominated)</li>
                        <li><strong>Wage Growth:</strong> 3.5% annually (outpacing inflation)</li>
                        <li><strong>Unemployment Rate:</strong> 2.1% (extremely low, indicating strong job market)</li>
                        <li><strong>Skill Shortage:</strong> Approximately 35,000 open positions globally unfilled</li>
                    </ul>

                    <InfoBox title="Workforce Crisis">
                        With an average technician age of 47 and high retirement rates, the industry faces a critical shortage of new entrants. Supply-demand imbalance is driving wage growth and creating opportunity for new technicians.
                    </InfoBox>
                </section>

                <section id="methods-market">
                    <h2>5. Market Share by NDT Method</h2>
                    <p>
                        Different NDT methods serve distinct applications and markets. Market share reflects both demand and maturity of each method.
                    </p>

                    <FeatureGrid>
                        <FeatureCard title="Ultrasonic (UT) - 38%">
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Largest single method</li>
                                <li>$4.5 billion market share</li>
                                <li>Oil & gas pipeline dominant</li>
                                <li>Growing in wind, renewable</li>
                                <li>Technology leader: PAUT/TOFD</li>
                            </ul>
                        </FeatureCard>
                        <FeatureCard title="Radiography (RT) - 22%">
                            <ul className="list-disc pl-4 space-y-1">
                                <li>$2.6 billion market share</li>
                                <li>Aerospace, aerospace critical</li>
                                <li>Weld inspection primary use</li>
                                <li>Stable, mature market</li>
                                <li>Digital RT emerging segment</li>
                            </ul>
                        </FeatureCard>
                        <FeatureCard title="Eddy Current (ET) - 12%">
                            <ul className="list-disc pl-4 space-y-1">
                                <li>$1.4 billion market share</li>
                                <li>Aerospace tubing inspection</li>
                                <li>Surface flaw detection</li>
                                <li>High-tech manufacturing</li>
                                <li>Specialized, stable demand</li>
                            </ul>
                        </FeatureCard>
                        <FeatureCard title="Other Methods - 28%">
                            <ul className="list-disc pl-4 space-y-1">
                                <li>PT/MT/VT/AUT/LT - $3.3B</li>
                                <li>Magnetic Particle dominant</li>
                                <li>Foundry/manufacturing sector</li>
                                <li>Penetrant testing steady</li>
                                <li>Emerging: Thermal, imaging</li>
                            </ul>
                        </FeatureCard>
                    </FeatureGrid>
                </section>

                <section id="industry-segments">
                    <h2>6. Industry Segment Analysis</h2>
                    <p>
                        NDT services are distributed across multiple industrial sectors, each with distinct characteristics, growth rates, and inspection requirements.
                    </p>

                    <h3>Market by Industry Vertical</h3>
                    <table className="w-full border-collapse border border-gray-300 my-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left">Industry</th>
                                <th className="border border-gray-300 p-2 text-left">Market Size</th>
                                <th className="border border-gray-300 p-2 text-left">Growth Rate</th>
                                <th className="border border-gray-300 p-2 text-left">Key Drivers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2"><strong>Oil & Gas</strong></td>
                                <td className="border border-gray-300 p-2">$3.9B (33%)</td>
                                <td className="border border-gray-300 p-2">+3.1%</td>
                                <td className="border border-gray-300 p-2">Aging pipelines, CEGR</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2"><strong>Aerospace</strong></td>
                                <td className="border border-gray-300 p-2">$2.1B (18%)</td>
                                <td className="border border-gray-300 p-2">+2.4%</td>
                                <td className="border border-gray-300 p-2">Safety focus, regulations</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2"><strong>Power/Energy</strong></td>
                                <td className="border border-gray-300 p-2">$1.8B (15%)</td>
                                <td className="border border-gray-300 p-2">+5.7%</td>
                                <td className="border border-gray-300 p-2">Renewable expansion</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2"><strong>Manufacturing</strong></td>
                                <td className="border border-gray-300 p-2">$1.6B (14%)</td>
                                <td className="border border-gray-300 p-2">+4.2%</td>
                                <td className="border border-gray-300 p-2">Quality control emphasis</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2"><strong>Infrastructure</strong></td>
                                <td className="border border-gray-300 p-2">$1.2B (10%)</td>
                                <td className="border border-gray-300 p-2">+6.8%</td>
                                <td className="border border-gray-300 p-2">Aging bridges, tunnels</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 p-2"><strong>Other</strong></td>
                                <td className="border border-gray-300 p-2">$1.2B (10%)</td>
                                <td className="border border-gray-300 p-2">+4.5%</td>
                                <td className="border border-gray-300 p-2">Rail, marine, utilities</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Segment Insights</h3>
                    <ul>
                        <li><strong>Oil & Gas:</strong> Largest segment but mature, with pipeline inspection being core business</li>
                        <li><strong>Aerospace:</strong> Highly regulated, highest quality standards, best-paying segment</li>
                        <li><strong>Renewable Energy:</strong> Fastest growing segment (+5.7%), wind turbine inspection primary driver</li>
                        <li><strong>Infrastructure:</strong> Growing as aging roads, bridges, and public works demand inspections</li>
                    </ul>
                </section>

                <section id="emerging-trends">
                    <h2>7. Emerging Trends and Future</h2>
                    <p>
                        The NDT industry is undergoing significant transformation driven by technology, workforce changes, and regulatory pressures.
                    </p>

                    <h3>Technology Trends</h3>
                    <ul>
                        <li><strong>Digital Transformation:</strong> Moving from film/analog to digital inspection records and cloud-based data management</li>
                        <li><strong>Automation:</strong> Robotic scanning systems, automated ultrasonic arrays, reducing human factors</li>
                        <li><strong>AI and Machine Learning:</strong> Improving flaw detection accuracy and reducing operator dependency</li>
                        <li><strong>Digital Twins:</strong> Integration of NDT data with operational parameters for predictive maintenance</li>
                        <li><strong>Real-Time Monitoring:</strong> Permanent installed sensors versus periodic inspections</li>
                    </ul>

                    <h3>Market Opportunities</h3>
                    <ul>
                        <li><strong>Renewable Energy Inspection:</strong> Wind turbines, solar infrastructure, emerging energy sources</li>
                        <li><strong>Infrastructure Renewal:</strong> Aging bridges, tunnels, roads requiring NDT assessment</li>
                        <li><strong>Additive Manufacturing:</strong> 3D-printed components requiring new inspection methods</li>
                        <li><strong>Cybersecurity/Supply Chain:</strong> Domestic manufacturing expansion creating inspection demand</li>
                        <li><strong>Software/Digital Services:</strong> Growing faster than traditional inspection services</li>
                    </ul>

                    <h3>Workforce Challenges</h3>
                    <ul>
                        <li><strong>Technician Shortage:</strong> 35,000+ unfilled positions globally, expected to worsen</li>
                        <li><strong>Aging Workforce:</strong> Average age 47, significant retirements expected 2026-2035</li>
                        <li><strong>Wage Pressure:</strong> Competition for scarce talent driving salary increases</li>
                        <li><strong>Skills Gap:</strong> New digital/automation skills demand exceeding supply</li>
                        <li><strong>Education Pipeline:</strong> Insufficient training programs to replace retiring technicians</li>
                    </ul>

                    <InfoBox title="Future Outlook">
                        The NDT industry faces both challenges and opportunities. Workforce shortages will create significant opportunities for new technicians, while technology adoption will transform service delivery and increase software/data component importance.
                    </InfoBox>

                    <h3>Projected Market Composition 2031</h3>
                    <ul>
                        <li><strong>Services:</strong> 60% ($9.1B) - decreased share as automation grows</li>
                        <li><strong>Equipment:</strong> 18% ($2.7B) - advanced systems like PAUT/automated scanning</li>
                        <li><strong>Software/Digital:</strong> 14% ($2.1B) - fastest growing segment (+12% CAGR)</li>
                        <li><strong>Training:</strong> 8% ($1.2B) - higher costs due to talent shortage premium</li>
                    </ul>
                </section>

                <section>
                    <h2>Conclusion: Market Opportunity</h2>
                    <p>
                        The NDT industry remains a strong growth opportunity globally, driven by aging industrial infrastructure, increasing regulatory requirements, and technology transformation. While the market faces workforce challenges, these constraints create exceptional opportunities for skilled professionals and innovative service providers.
                    </p>
                    <p>
                        Organizations investing in technology, automation, and talent development will be well-positioned to capture growing market opportunities. For individuals considering NDT careers, the demographic shift and skill shortages create unprecedented opportunity for employment, advancement, and competitive compensation.
                    </p>
                </section>

                <CTASection
                    title="Connect with NDT Industry Leaders"
                    description="Find NDT service providers, equipment suppliers, and training organizations. Get access to the fastest-growing segment of the inspection and maintenance industry."
                    buttonText="Find NDT Providers"
                    buttonHref="/find-providers"
                />
            </BlogLayout>
        </>
    );
}
