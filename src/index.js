import {
	Router
} from './router';


document.addEventListener('DOMContentLoaded', function() {
	var router = new Router();
	router.navigate();
	history.pushState("", "", "");
});