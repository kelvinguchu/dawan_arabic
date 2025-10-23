import React from 'react'
import { BiGlobe, BiTv, BiBookOpen } from 'react-icons/bi'
import Link from 'next/link'

export const OurPlatforms: React.FC = () => {
  const platforms = [
    {
      name: 'Dawan TV',
      description: 'نقدم محتوى باللغة العربية، مركزين على العالم العربي.',
      url: 'https://dawan.so',
      displayUrl: 'Dawan.so',
      icon: <BiTv className="h-8 w-8 sm:h-12 sm:w-12" />,
      language: 'العربية',
      bgColor: 'bg-primary',
      hoverColor: 'hover:bg-primary/80',
    },
    {
      name: 'Dawan Africa',
      description: 'أخبار ومحتوى باللغة الإنجليزية، مركزين على العالم العربي والمغتربين.',
      url: 'https://dawan.africa',
      displayUrl: 'Dawan.africa',
      icon: <BiGlobe className="h-8 w-8 sm:h-12 sm:w-12" />,
      language: 'الإنجليزية',
      bgColor: 'bg-secondary',
      hoverColor: 'hover:bg-secondary/80',
    },
    {
      name: 'Bawaba Africa',
      description: 'منصة دولية تربط العالم العربي مع العالم.',
      url: 'https://bawaba.africa',
      displayUrl: 'Bawaba.africa',
      icon: <BiBookOpen className="h-8 w-8 sm:h-12 sm:w-12" />,
      language: 'متعدد اللغات',
      bgColor: 'bg-accent',
      hoverColor: 'hover:bg-accent/80',
    },
  ]

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-right">
              منصاتنا
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-right">
              ثلاث منصات تخدم جماهير مختلفة باللغات العربية والإنجليزية، مع التركيز على العالم
              العربي.
            </p>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg sm:rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6 flex-row-reverse">
                  <div
                    className={`${platform.bgColor} ${platform.hoverColor} text-white p-3 sm:p-4 rounded-lg sm:rounded-xl transition-colors duration-300`}
                  >
                    {platform.icon}
                  </div>
                  <span className="text-sm sm:text-base bg-gray-200 text-gray-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                    {platform.language}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300 text-right">
                  {platform.name}
                </h3>

                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed grow text-right">
                  {platform.description}
                </p>

                <div className="mt-auto">
                  <Link
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-full ${platform.bgColor} ${platform.hoverColor} text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-base sm:text-lg font-medium transition-colors duration-300 flex-row-reverse`}
                  >
                    زيارة {platform.displayUrl}
                    <BiGlobe className="mr-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <div className="bg-primary rounded-lg sm:rounded-xl p-6 sm:p-8 text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-right">
                ربط المجتمعات ذات اللغات المختلفة
              </h3>
              <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-right">
                ربط الثقافات وتعزيز الفهم داخل العالم العربي.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
