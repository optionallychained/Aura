(() => {
	// set up dropdown handling
	const dropDownTriggers = document.querySelectorAll('li.dropdown');
	dropDownTriggers.forEach((el) => {
		// open the dropdown if we're on a page linked from within it
		const path = window.location.pathname;
		if (path.includes(el.id)) {
			el.classList.add('open');
		}
	});
})();
