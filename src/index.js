import {
	Page
} from './classes/Page';


document.addEventListener('DOMContentLoaded', function() {
	var page = new Page();
	page.steer();
	history.pushState("", "", "");
});