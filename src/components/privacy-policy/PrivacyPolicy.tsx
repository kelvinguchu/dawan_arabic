import React from 'react'

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-slate-900 to-slate-800 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              سياسة الخصوصية
            </h1>
            <p className="text-lg sm:text-xl text-gray-300">محدث في: 3 يونيو، 2025</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed">
                تحدد سياسة الخصوصية هذه سياساتنا وإجراءاتنا المتعلقة بجمع واستخدام وإفشاء معلوماتك
                عند استخدامك للخدمة، كما توضح حقوقك الخاصة وكيف يحميك القانون.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                نستخدم بياناتك الشخصية لتقديم الخدمة وتحسينها. عند استخدامك للخدمة، فإنك توافق على
                جمع واستخدام المعلومات وفقاً لسياسة الخصوصية هذه.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              المقدمة والتعريفات
            </h2>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">المقدمة</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              الكلمات التي تبدأ بحرف كبير لها معاني محددة في الشروط التالية. التعريفات التالية
              لها نفس المعنى بغض النظر عن ظهورها في صيغة المفرد أو الجمع.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">التعريفات</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              أغراض سياسة الخصوصية:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الحساب</strong> يعني حسابًا فريدًا تم إنشاؤه لك للوصول
                  إلى خدمتنا أو أجزاء منها.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الشركة التابعة</strong> تعني كيانًا تتحكم فيه،
                  أو تتحكم فيه معًا، أو تكون تحت سيطرة مشتركة معه، حيث تعني &quot;السيطرة&quot;
                  ملكية 50% أو أكثر من الأسهم أو الملكية أو الأسهم أو الأوراق المالية الأخرى
                  التي تخول الحق في التصويت في انتخاب المديرين أو المديرين الآخرين.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الشركة</strong> (المشار إليها بـ &quot;الشركة&quot;،
                  &quot;نحن&quot;، &quot;لدينا&quot; أو &quot;لنا&quot; في هذا الاتفاق) تشير إلى مجموعة دوان ميديا،
                  شارع مارينيو، مقديشو، الصومال.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الكوكيز</strong> هي ملفات صغيرة يتم وضعها على
                  جهاز الكمبيوتر أو الجهاز المحمول أو أي جهاز آخر يحتوي على معلومات مفصلة عن
                  سجل التصفح الخاص بك وخدمات أخرى.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">البلد</strong> يشير إلى: الصومال
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الجهاز</strong> يعني أي جهاز يمكنه الوصول إلى
                  الخدمة مثل الكمبيوتر أو الهاتف المحمول أو الجهاز اللوحي الرقمي.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">البيانات الشخصية</strong> هي أي معلومات تتعلق
                  بشخص محدد أو يمكن تحديده.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الخدمة</strong> تشير إلى الموقع الإلكتروني.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">مزود الخدمة</strong> يعني أي شخص طبيعي أو اعتباري
                  يعالج البيانات نيابة عن الشركة. يشمل ذلك أطرافًا ثالثة أو أفرادًا توظفهم الشركة
                  لتسهيل الخدمة أو تقديم الخدمة نيابة عن الشركة أو أداء خدمات ذات صلة بالخدمة
                  أو مساعدة الشركة في تحليل كيفية استخدام الخدمة.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">بيانات الاستخدام</strong> تشير إلى البيانات التي
                  يتم جمعها تلقائيًا، سواء تم إنشاؤها من استخدام الخدمة أو من البنية التحتية للخدمة
                  نفسها (على سبيل المثال، مدة زيارة الصفحة).
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الموقع الإلكتروني</strong> يشير إلى بوابة أفريقيا،
                  التي يمكن الوصول إليها من{' '}
                  <a
                    href="https://www.bawaba.africa"
                    className="text-primary hover:underline"
                    rel="external nofollow noopener"
                    target="_blank"
                  >
                    https://www.bawaba.africa
                  </a>
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">أنت</strong> تعني الشخص الذي يدخل أو يستخدم
                  الخدمة، أو الشركة، أو الكيان القانوني الآخر الذي يمثل ذلك الشخص في الدخول أو
                  استخدام الخدمة، حسب الاقتضاء.
                </p>
              </li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              جمع واستخدام البيانات الشخصية
            </h2>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              أنواع البيانات التي تم جمعها
            </h3>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
              البيانات الشخصية
            </h4>
            <p className="text-gray-600 leading-relaxed mb-4">
              عند استخدام خدمتنا، قد نطلب منك تزويدنا بمعلومات شخصية قابلة للتحديد يمكن استخدامها
              للتواصل معك أو للتعرف عليك. يمكن أن تشمل المعلومات الشخصية القابلة للتحديد، على سبيل
              المثال لا الحصر:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600">
              <li>عنوان البريد الإلكتروني</li>
              <li>الاسم الأول والأخير</li>
              <li>بيانات الاستخدام</li>
            </ul>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
              بيانات الاستخدام
            </h4>
            <p className="text-gray-600 leading-relaxed mb-4">
              يتم جمع بيانات الاستخدام تلقائيًا عند استخدام الخدمة.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              قد تحتوي بيانات الاستخدام على معلومات مثل عنوان بروتوكول الإنترنت الخاص بجهازك
              (على سبيل المثال عنوان IP)، ونوع المتصفح، وإصدار المتصفح، وصفحات خدمتنا التي تزورها،
              ووقت وتاريخ زيارتك، والوقت المستغرق في تلك الصفحات، ومعرفات الأجهزة الفريدة وبيانات تشخيص أخرى.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              عند الدخول إلى الخدمة باستخدام الجهاز المحمول أو عبره، قد نجمع تلقائيًا معلومات معينة،
              بما في ذلك على سبيل المثال لا الحصر، نوع الجهاز المحمول الذي تستخدمه، والمعرف الفريد
              لجهازك المحمول، وعنوان IP الخاص بجهازك المحمول، ونظام تشغيل جهازك المحمول، ونوع متصفح
              الإنترنت المحمول الذي تستخدمه، ومعرفات الأجهزة الفريدة وبيانات تشخيص أخرى.
            </p>

            <h4 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
              تقنيات التتبع والكوكيز
            </h4>
            <p className="text-gray-600 leading-relaxed mb-4">
              نستخدم الكوكيز والتقنيات المماثلة للتتبع لتتبع نشاط خدمتنا وتخزين معلومات معينة.
              تقنيات التتبع المستخدمة هي منارات، وعلامات، ونصوص لجمع وتتبع المعلومات وتحسين
              ومراقبة خدمتنا.
            </p>

            <div className="bg-blue-50 border-l-4 border-primary p-6 mb-8">
              <h5 className="font-semibold text-gray-800 mb-2">تنبيه هام</h5>
              <p className="text-gray-600">
                لمزيد من المعلومات حول الكوكيز وحقوقك الشخصية، يرجى التواصل معنا باستخدام المعلومات
                المقدمة في نهاية هذه السياسة.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              تواصل معنا
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="font-semibold text-primary ml-2">البريد الإلكتروني:</span>
                  <a
                    href="mailto:info@bawaba.africa"
                    className="text-gray-700 hover:text-primary"
                  >
                    info@bawaba.africa
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="font-semibold text-primary ml-2">الهاتف:</span>
                  <a href="tel:+252628881171" className="text-gray-700 hover:text-primary">
                    +252628881171
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
