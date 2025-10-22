import React from 'react'

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-slate-900 to-slate-800 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              الشروط والأحكام
            </h1>
            <p className="text-lg sm:text-xl text-gray-300">محدث في: 3 يونيو، 2025</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-slate ">
            <div className="mb-8">
              <p className="text-gray-600 leading-relaxed">
                هذه الشروط والأحكام (&quot;الشروط&quot;، &quot;الشروط والأحكام&quot;) تحكم العلاقة
                بينك وبين موقع بوابة أفريقيا (وهو &quot;الخدمة&quot;) الذي تديره مجموعة دوان ميديا
                (&quot;نحن&quot;، &quot;لدينا&quot;، أو &quot;لنا&quot;).
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام هذه الخدمة. وصولك
                واستخدامك للخدمة مشروط بقبولك والتزامك بهذه الشروط. عند الدخول أو استخدام
                خدمتنا، فإنك توافق على أنك ملزم بهذه الشروط.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              التعريفات
            </h2>

            <ul className="space-y-4 mb-8">
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الخدمة</strong> تشير إلى موقع بوابة أفريقيا
                  الذي تديره مجموعة دوان ميديا.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الشروط</strong> تشير إلى هذه الشروط والأحكام
                  الكاملة للاتفاق بينك وبين مجموعة دوان ميديا بشأن استخدام الخدمة.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">المستخدم</strong> يشير إلى الشخص الذي يدخل
                  أو يستخدم الخدمة.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">الحساب</strong> يشير إلى حساب فريد تم إنشاؤه
                  لك للوصول إلى خدمتنا أو أجزاء منها.
                </p>
              </li>
              <li className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong className="text-primary">المحتوى</strong> يشير إلى أي مواد تشمل نصوصًا،
                  صورًا، أو معلومات أخرى يمكن إضافتها أو تحميلها أو الوصول إليها أو ربطها بأي طريقة.
                </p>
              </li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              حسابات المستخدمين
            </h2>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              إنشاء الحساب
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              للوصول إلى بعض ميزات خدمتنا، قد يُطلب منك إنشاء حساب. عند إنشاء حساب، يجب عليك:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600">
              <li>تقديم معلومات حقيقية كاملة وحديثة</li>
              <li>مراجعة وتحديث بيانات حسابك فوراً</li>
              <li>الحفاظ على أمان وسريه معلومات الدخول الخاصة بك</li>
              <li>تحمل المسؤولية عن جميع الأنشطة الصادرة من حسابك</li>
              <li>إبلاغنا فوراً إذا تم استخدام حسابك بطريقة غير مصرح بها</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              مسؤوليات الحساب
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">أنت مسؤول عن:</p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600">
              <li>حماية كلمة المرور ومعلومات حسابك</li>
              <li>جميع الأنشطة الصادرة من حسابك</li>
              <li>أن تكون بيانات حسابك حديثة ودقيقة</li>
              <li>الامتثال لجميع القوانين واللوائحات المعمول بها</li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <h5 className="font-semibold text-gray-800 mb-2">إيقاف الحساب</h5>
              <p className="text-gray-600">
                نحن نحتفظ بالحق في تعليق أو إيقاف حسابك في أي وقت إذا انتهكت هذه الشروط
                أو تصرفت بطريقة تعتبر ضريرة لخدمتنا أو المستخدمين الآخرين.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              خدمات الاشتراك
            </h2>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              خطط الاشتراك
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              نقدم خدمات قائمة على الاشتراك توفر ميزات إضافية وإمكانية الوصول إلى المحتوى. عند الاشتراك
              في خدمتنا، فإنك توافق على:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600">
              <li>دفع جميع رسوم الاشتراك كما هو موضح في الخطة التي اخترتها</li>
              <li>تقديم معلومات فواتير ودفع صحيحة</li>
              <li>تحديث معلومات الدفع بسرعة في حالة تغيرها</li>
              <li>الالتزام بالشروط الخاصة بمستوى اشتراكك</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              الفواتير والدفع
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="space-y-3">
                <li>
                  <strong className="text-primary">الدفع المتكرر:</strong> خدمات الاشتراك
                  تُدفع بشكل متكرر بناءً على دورة الفوترة التي اخترتها.
                </li>
                <li>
                  <strong className="text-primary">تغيير السعر:</strong> نحن نحتفظ بالحق
                  في تغيير أسعار الاشتراك مع إشعار مسبق لمدة 30 يوماً.
                </li>
                <li>
                  <strong className="text-primary">فشل الدفع:</strong> في حالة
                  فشل الدفع، قد نوقف الوصول حتى يتم حل المشكلة.
                </li>
                <li>
                  <strong className="text-primary">استرداد الأموال:</strong> تسترد الأموال
                  وفقاً لسياسة الاسترداد الخاصة بنا، ويمكن طلبها عند الحاجة.
                </li>
              </ul>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              الإلغاء واسترداد الأموال
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              يمكنك إلغاء اشتراكك في أي وقت باستخدام إعدادات حسابك. عند الإلغاء، ستحتفظ بالوصول إلى
              الميزات المميزة حتى نهاية دورة الفوترة الحالية. لا نقدم استرداداً جزئياً ل
              دورات فوترة غير مكتملة، إلا إذا يقتضي القانون ذلك.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              سياسة الاستخدام المقبول
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              توافق على عدم استخدام الخدمة لأغراض غير قانونية أو للتسبب في ضرر، أو إزعاج، أو إثقال،
              أو إلحاق الضرر بخدمتنا. الأنشطة المحظورة تشمل:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600">
              <li>انتهاك القوانين المحلية أو الوطنية أو الدولية المعمول بها</li>
              <li>نشر محتوى ضار أو مسيء أو تهديدي أو انتهاكي</li>
              <li>محاولة الوصول إلى أنظمتنا بطريقة غير مصرح بها</li>
              <li>إزعاج أو تعطيل الخدمة أو الخوادم</li>
              <li>الانتحال أو إدعاء كونه شخصاً أو كياناً آخر</li>
              <li>جمع أو حصاد البيانات الشخصية للمستخدمين الآخرين</li>
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              حقوق الملكية الفكرية
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              الخدمة ومحتواها الأصلي وميزاتها ووظائفها هي، وستبقى، ملكية حصرية لمجموعة دوان ميديا
              والمرخص لهم. الخدمة محمية بموجب قوانين حقوق النشر والعلامات التجارية والقوانين الأخرى.
              لا يمكن استخدام علاماتنا التجارية وشعارنا دون إذن كتابي مسبق.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              سياسة الخصوصية
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              الخصوصية مهمة لنا. يرجى مراجعة سياسة الخصوصية الخاصة بنا، والتي تحكم أيضاً استخدامك
              للخدمة، لفهم كيفية جمعنا واستخدامنا لمعلوماتك الشخصية.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              تحديد المسؤولية
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              لن تكون مجموعة دوان ميديا، أو مديروها، أو موظفوها، أو مشغلوها، أو وكلاؤها، أو الموزعون،
              أو المرتبطون بها مسؤولين تحت أي ظرف من الظروف عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تابعة أو عقابية،
              بما في ذلك على سبيل المثال لا الحصر، فقدان الأرباح أو البيانات أو الاستخدام أو الثقة التجارية أو الأضرار غير الملموسة،
              الناشئة عن استخدامك للخدمة.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              تغييرات الشروط
            </h2>

            <div className="bg-blue-50 border-l-4 border-primary p-6 mb-8">
              <p className="text-gray-600">
                نحن نحتفظ بالحق في تعديل هذه الشروط في أي وقت. إذا كان التعديل جوهرياً، سنحاول
                توفير إشعار لمدة 30 يوماً على الأقل قبل تطبيق الشروط الجديدة. استمرارك في استخدام
                خدمتنا بعد هذه التعديلات يعني قبولك للشروط المحدثة.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-2">
              معلومات الاتصال
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا:
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
                <li className="flex items-start">
                  <span className="font-semibold text-primary ml-2">العنوان:</span>
                  <span className="text-gray-700">
                    مجموعة دوان ميديا
                    <br />
                    شارع مارينيو، مقديشو، الصومال
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsAndConditions
