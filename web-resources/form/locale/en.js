(function(_) {
	
	_.en = {
		'success' : 'Operation done successflly',
		'validate' : 'Values not validate',
		'ok' : 'OK',
		'cancel' : 'Cancel',
		'error' : 'Error',
		'timeout' : 'Connection timeout',
		'oneRow' : 'Select one record',
		'forbidden' : 'Forbidden',
		'persist': 'Persist',
		'merge' : 'Merge',
		'remove' : 'Remove',
		'loading' : 'Loading ...',
		'confirm' : 'Confirm to proceed?',
		'question' : 'Question',
		'yes' : 'Yes',
		'no' : 'No',
		'checkAll' : 'Check all',
		'uncheckAll' : 'Uncheck all',
		'noneSelectedItem' : 'Select options',
		'selectedItem' : '# selected',
		'month' : 'month',
		'notHandle' : 'not handle',
		'refresh' : 'refresh',
		'help' : 'help',
		'partial' : 'refresh partial',
		'clear' : 'clear',
		'close' : 'close',
		'shuffle' : 'shuffle',						
		'filter' : 'Filter',
		'asc'	: 'Asc',
		'desc' : 'Desc',
		'page' : 'Page',
		'to' : 'To',
		'first' : 'First',
		'prev' : 'Prev',
		'next' : 'Next',
		'last' : 'Last',	
		'count' : 'Total Count',
		'expireUser' : 'Expire user?',		
		'id' : 'ID',
		'name' : 'Name',
		'method' : 'Method',
		'username' : 'Username',
		'enabled' : 'Enabled',
		'accountNonLocked' : 'Account non locked',
		'accountLockedDue' : 'Account locked due',
		'accountNonExpired' : 'Account non expired',
		'accountExpiredDate' : 'Account expired date',
		'credentialsNonExpired' : 'Credentials non expired',
		'credentialsExpiredDate' : 'Credentials expired date',		
		'status' : 'Status',				
		'yes' : 'Yes',
		'no' : 'No',		
		'active' : 'Active',
		'disactive' : 'Disactive',	
		'Bad credentials' : 'Bad credentials',
		'User is disabled' : 'User is disabled',
		'User account is locked' : 'User account is locked',
		'User account has expired' : 'User account has expired',
		'User credentials have expired' : 'User credentials have expired',
		'Maximum sessions of 1 for this principal exceeded' : 'Maximum sessions of 1 for this principal exceeded',
		"can't expire user currently does active" : "can't expire user currently does active",
		"authority already exist" : "authority already exist",		
				
		/*
		 * validation
		 */	
		'not.null' : 'Must have a value',
		//--> length
		'not.blank' : 'Must have a value',
		'length' : 'Value must have length between {0} and {1} characters',
		'max.length' : 'Maximum value is {0}',
		'min.length' : 'Minimum value is {0}',
		'fix.length' : 'Value must have {0}',
		//--> size
		'not.empty' : 'Must have a value',
		'size' : 'Size of value must be between {0} and {1}',
		'max.size' : 'Maximum size is {0}',
		'min.size' : 'Minimum size is {0}',
		'fix.size' : 'Value must have {0} size',
		//--> range
		'max' : '',		
		'min' : '',
		'range' : '',
		'regexp' : '',
		//--> others
		'email' : '',
		'expression' : 'Input value is not valid',
		'regexp' : '',
		//--> components
		'value.exist' : 'Input value is not valid',
		
		/*
		 * form
		 */
		
		//--> login
		'login.title' : 'Login',
		'login.username' : 'Username',
		'login.password' : 'Password',
		'login.captcha' : 'Input CAPTCHA value',
			
		//--> layout
		'layout.titleMsg' : 'Centeral dashboard',
		'layout.accountMsg' : 'User: ',
		'layout.dateMsg' : 'Date: ',
		'layout.clockMsg' : 'Time: ',
		'layout.detourMsg' : 'Detour',
		'layout.logoutMsg' : 'Logout',		
		'layout.MENU_MAIN' : 'Users management',
		'layout.MENU_MAIN_USER' : 'Users',
		'layout.MENU_MAIN_SESSION' : 'Active users',
		'layout.MENU_MAIN_AUTHORITY' : 'Authority',
		'layout.MENU_MAIN_PASSWORD' : 'Password',
		'layout.MENU_MAIN_INDEX' : 'Features',
		'layout.MENU_MAIN_CONFIGURATION' : 'Configuration',
		'layout.MENU_MAIN_PERMISSION' : 'Persmission',	
		
		//--> index
		'index.title' : 'Features',
		
		//--> authority
		'authority.title' : 'Authority',	
		
		//--> authorityDialog
		'authorityDialog.title' : 'Group',
		'authorityDialog.authorityName' : 'Group name',
		'authorityDialog.authorityName.regexp' : 'Should uppercase and start with this phrase ROLE_',
		
		//--> session
		'session.title' : 'Active users',
		'session.grid.title' : 'Users',
		'session.grid.titles.id' : 'ID',
		'session.grid.titles.username' : 'Username',
		'session.grid.titles.firstName' : 'First name',
		'session.grid.titles.lastName' : 'Last name',
		'session.grid.titles.status' : 'Status',		

		//--> password
		'password.title' : 'Title',
		'password.oldPass' : 'Old password',
		'password.newPass' : 'New Password',
		'password.verifyPass' : 'Verify Password',
		'password.verifyPass.expression' : 'Verify password not confirm',		
			
		//--> user
		'user.title' : 'Users management',
		
		//--> userDialog
		'userDialog.title' : 'User',
		'userDialog.username' : 'Username',
		'userDialog.authority' : 'Authority',
		'userDialog.authority.title' : 'Group',
		'userDialog.enabled' : 'Enabled',
		'userDialog.accountNonExpired' : 'Account non expired',
		'userDialog.accountExpiredDate' : 'Account expired date',
		'userDialog.credentialsNonExpired' : 'Credentials non expired',
		'userDialog.credentialsExpiredDate' : 'Credentials expired date',
		'userDialog.accountNonLocked' : 'Account non locked',
		'userDialog.accountLockedDue' : 'Account locked due',
		
		//--> permission
		'permission.title' : 'Permission management',
		'permission.services' : 'Service',
		'permission.methods' : 'Method',
		'permission.spel' : 'SPEL',
		'permission.btn' : 'Refresh',
		'permission.grid.titles.name' : 'Service',		
		'permission.grid.titles.spel' : 'SPEL'		
		
		
		
		

	}	
	
})(jQuery.ZAP.message);