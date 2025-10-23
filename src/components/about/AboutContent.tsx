import React from 'react'
import { BiBookOpen, BiAnalyse, BiTrendingUp, BiGroup } from 'react-icons/bi'

export const AboutContent: React.FC = () => {
  const services = [
    {
      icon: <BiBookOpen className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: 'أخبار شاملة',
      description: 'أخبار عاجلة وأحداث حالية في العالم العربي.',
    },
    {
      icon: <BiAnalyse className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: 'تحليلات معمقة',
      description:
        'تحليلات وآراء خبراء حول القضايا السياسية والاقتصادية والاجتماعية في العالم العربي.',
    },
    {
      icon: <BiTrendingUp className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: 'رؤى الأعمال',
      description: 'تغيرات السوق، التوقعات الاقتصادية، وفرص الأعمال في العالم العربي.',
    },
    {
      icon: <BiGroup className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: 'قصص ثقافية',
      description: 'تراث ثقافي غني، عادات وتقاليد وقصص تصف المجتمع العربي.',
    },
  ]

  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-right">
              مهمتنا
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-right">
              مجموعة دوان الإعلامية هي وسيلة إعلامية حيوية تأسست في 2023، تركز
              على العالم العربي. نقدم أخباراً شاملة، تحليلات معمقة،
              رؤى اقتصادية، تغطية سياسية، وقصص ثقافية مهمة.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-center group"
              >
                <div className="text-primary mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4 text-right">
                  {service.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-right">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-8 sm:p-12 shadow-sm text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-right">
              رؤيتنا
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-right">
              مجموعة دوان الإعلامية مكرسة لإلهام، والمشاركة، والربط بين المجتمعات. نؤمن بقوة
              القصص الحقيقية التي تربط الثقافات وتعزز الفهم داخل العالم العربي والمجتمعات العربية في الخارج.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
