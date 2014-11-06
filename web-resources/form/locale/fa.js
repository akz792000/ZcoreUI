(function(_) {
	
	_.fa = {
			
		/*
		 * global
		 */	
		'success' : 'عملیات به درستی انجام شد',
		'validate' : 'مقدار ورودی معتبر نمی باشد',
		'ok' : 'تایید',
		'cancel' : 'انصراف',
		'error' : 'خطا',
		'timeout' : 'ارتباط با سرور قطع می باشد',
		'oneRow' : 'می بایستی یک رکورد انتخاب شود',
		'forbidden' : 'اجازه دسترسی به این قسمت را ندارید',
		'persist': 'درج',
		'merge' : 'اصلاح',
		'remove' : 'حذف',
		'loading' : 'صبر کنید ...',
		'confirm' : 'ادامه عملیات را تایید می کنید؟',
		'question' : 'سوال',
		'yes' : 'بلی',
		'no' : 'خیر',
		'checkAll' : 'انتخاب همه',
		'uncheckAll' : 'هیچکدام',
		'noneSelectedItem' : 'انتخاب گزینه ها',
		'selectedItem' : '# گزینه',
		'month' : 'ماه',
		'notHandle' : 'لطفآ با مسئولین تماس بگیرید.',
		'refresh' : 'بروزرسانی',
		'help' : 'کمک',
		'partial' : 'بروزرسانی قسمتی',
		'clear' : 'پاک',
		'close' : 'بستن',
		'shuffle' : 'درآمیختن',						
		'filter' : 'فیلتر',
		'asc'	: 'صعودی',
		'desc' : 'نزولی',
		'page' : 'صفحه',
		'to' : 'از',
		'first' : 'ابتدا',
		'prev' : 'قبلی',
		'next' : 'بعدی',
		'last' : 'انتها',	
		'count' : 'تعداد کل',
		'expireUser' : 'آیا از خارج کردن کاربر از سیستم مطمئن هستید؟',		
		'id' : 'شناسه',
		'name' : 'نام',
		'method' : 'متد',
		'username' : 'نام کاربر',
		'enabled' : 'فعال',
		'accountNonLocked' : 'غیر قابل مسدودی',
		'accountLockedDue' : 'علت مسدودی',
		'accountNonExpired' : 'حساب غیر قابل انقضاء',
		'accountExpiredDate' : 'تاریخ انقضاء حساب',
		'credentialsNonExpired' : 'رمز عبور غیر قابل انقضاء',
		'credentialsExpiredDate' : 'تاریخ انقضاء رمز عبور',		
		'status' : 'وضعیت',				
		'yes' : 'بلی',
		'no' : 'خیر',		
		'active' : 'فعال',
		'disactive' : 'غیر فعال',	
		'Bad credentials' : 'رمز عبور نادرست است',
		'User is disabled' : 'حساب کاربری غیر فعال شده است',
		'User account is locked' : 'حساب کاربری مسدود شده است',
		'User account has expired' : 'اعتبار کاربر تمام شده است',
		'User credentials have expired' : 'اعتبار رمز عبور کاربر تمام شده است',
		'Maximum sessions of 1 for this principal exceeded' : 'کاربر هنوز از سیستم خارج نشده است',
		"can't expire user currently does active" : 'امکان خارج کردن کابر جاری وجود ندارد',
		"authority already exist" : "گروه در حال حاضر موجود است",		
				
		/*
		 * validation
		 */	
		'not.null' : 'مقدار ورودی اجباری است',
		//--> length
		'not.blank' : 'مقدار ورودی اجباری است',
		'length' : 'مقدار ورودی می بایستی بین {0} تا {1} باشد',
		'max.length' : 'حداکثر مقدار برابر {0} می باشد',
		'min.length' : 'حداقل مقدار برابر {0} می باشد',
		'fix.length' : 'مقدار ورودی می بایستی {0} کاراکتر باشد',
		//--> size
		'not.empty' : 'مقدار ورودی اجباری است',
		'size' : 'تعداد مقادیر ورودی می بایستی بین {0} تا {1} باشد',
		'max.size' : 'تعداد مقادیر  حداکثر {0} می باشد',
		'min.size' : 'تعداد مقادیر حداقل {0} می باشد',
		'fix.size' : 'تعداد مقادیر می بایستی {0} کاراکتر باشد',
		//--> range
		'max' : '',		
		'min' : '',
		'range' : '',
		'regexp' : '',
		//--> others
		'email' : '',
		'expression' : 'مقدار ورودی معتبر نیست',
		'regexp' : '',
		//--> components
		'value.exist' : 'مقدار ورودی معتبر نیست',
		'examine.captcha' : 'مقدار ورودی معتبر نیست',
		
		'English' : 'انگلیسی',
		'Farsi' : 'فارسی',
		
		/*
		 * form
		 */
		
		//--> login
		'login.title' : 'فرم عبور',
		'login.username' : 'نام کاربر',
		'login.password' : 'رمز عبور',
		'login.captcha' : 'متن را وارد نمایید',
		'login.language' : 'زبان',
			
		//--> layout
		'layout.titleMsg' : 'کارتابل مرکزی',
		'layout.accountMsg' : ' کاربر :',
		'layout.dateMsg' : 'تاریخ کاری :',
		'layout.clockMsg' : 'زمان :',
		'layout.detourMsg' : 'میانبر',
		'layout.logoutMsg' : 'خروج',		
		'layout.MENU_MAIN' : 'مديريت كاربران',
		'layout.MENU_MAIN_USER' : 'كاربران',
		'layout.MENU_MAIN_SESSION' : 'کاربران فعال',
		'layout.MENU_MAIN_AUTHORITY' : 'تعریف اعتبار',
		'layout.MENU_MAIN_PASSWORD' : 'تغيير رمز',
		'layout.MENU_MAIN_INDEX' : 'مشخصات',
		'layout.MENU_MAIN_CONFIGURATION' : 'تنظیمات',
		'layout.MENU_MAIN_PERMISSION' : 'مدیریت سرویس',
		'layout.MENU_MAIN_GRID' : 'تست گریدها',
		
		'layout.MENU_MAIN_TICKET' : 'تیکت',
		'layout.MENU_MAIN_TICKET_CREATE' : 'درج تیکت',
		
		'layout.MENU_TICKET' : 'عملیات تیکت',
		'layout.MENU_MAIN_TICKET_VIEW' : 'مشاهده تیکت',
		
		
		//--> index
		'index.title' : 'مشخصات',
		
		//--> authority
		'authority.title' : 'اعتبار',	
		
		//--> authorityDialog
		'authorityDialog.title' : 'گروه',
		'authorityDialog.authorityName' : 'نام گروه',
		'authorityDialog.authorityName.regexp' : 'می بایستی با حروف بزرگ  و با عبارت ROLE_ شروع شود',
		
		//--> session
		'session.title' : 'کاربران فعال',
		'session.grid.title' : 'لیست کاربران',
		'session.grid.titles.id' : 'شناسه',
		'session.grid.titles.username' : 'نام کاربر',
		'session.grid.titles.firstName' : 'نام',
		'session.grid.titles.lastName' : 'نام خانوادگی',
		'session.grid.titles.status' : 'وضعیت',		

		//--> password
		'password.title' : 'رمز عبور',
		'password.oldPass' : 'رمز قدیم',
		'password.newPass' : 'رمز جدید',
		'password.verifyPass' : 'تکرار رمز جدید',
		'password.verifyPass.expression' : 'مغایرت در رمز جدید',		
			
		//--> user
		'user.title' : 'مدیریت کاربران',
		
		//--> userDialog
		'userDialog.title' : 'کاربر',
		'userDialog.username' : 'نام کاربر',
		'userDialog.authority' : 'گروه',
		'userDialog.authority.title' : 'گروه',
		'userDialog.enabled' : 'فعال',
		'userDialog.accountNonExpired' : 'حساب غیر قابل انقضاء',
		'userDialog.accountExpiredDate' : 'تاریخ انقضاء حساب',
		'userDialog.credentialsNonExpired' : 'رمز عبور غیر قابل انقضاء',
		'userDialog.credentialsExpiredDate' : 'تاریخ انقضاء رمز عبور',
		'userDialog.accountNonLocked' : 'غیر قابل مسدودی',
		'userDialog.accountLockedDue' : 'علت مسدودی',
		
		//--> permission
		'permission.title' : 'مدیریت سرویس',
		'permission.services' : 'سرویس',
		'permission.methods' : 'متد',
		'permission.spel' : 'دسترسی',
		'permission.btn' : 'بروزرسانی',
		'permission.grid.titles.name' : 'سرویس',		
		'permission.grid.titles.spel' : 'دسترسی'
		
	};	
	
})(jQuery.ZAP.message);