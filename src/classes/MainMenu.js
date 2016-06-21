export class MainMenu {

	generate(callback) {
		var items = [{
			title: "Motion Events",
			subTitle: "Recently captured motion events",
			icon: "motion",
			params: {
				page: "motion"
			}
		}, {
			title: "Saved Video",
			subTitle: "Saved Recordings. Recordings normally delete every 3 days",
			icon: "saved",
			params: {
				page: "saved"
			}
		}, {
			title: "All Recordings",
			subTitle: "Past 3 days round the clock recordings",
			icon: "list",
			params: {
				page: "recordings"
			}
		}, {
			title: "Live Feeds",
			subTitle: "Live camera views",
			icon: "camera",
			params: {
				page: "live"
			}
		}];

		return callback(null, items);
	}
}