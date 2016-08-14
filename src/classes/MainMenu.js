export class MainMenu {

	generate(user, callback) {
		var items = [{
			id: "home",
			title: "Home Automation",
			subTitle: "Turn off lights, TVs, set climate etc",
			icon: "lightbulb",
			params: {
				page: "automation"
			}
		}, {
			id: "cameras",
			title: "Security Cameras",
			subTitle: "Live cameras, recordings and motion events",
			icon: "camera",
			params: {
				page: "cameras"
			}
		}, {
			id: "stern",
			title: "Howard Stern",
			subTitle: "The radio show turned into a podcast",
			icon: "stern",
			params: {
				page: "url",
				href: "https://jed.bz/stern/"
			}
		}, {
			id: "emby",
			title: "Emby",
			subTitle: "Formerly MediaBrowser, watch movies and tv shows",
			icon: "emby",
			params: {
				page: "url",
				href: "https://jed.bz:8888"
			}
		}, {
			id: "torrent",
			title: "Torrents",
			subTitle: "Download some shit on bittorrent",
			icon: "utorrent",
			params: {
				page: "url",
				href: "https://jed.bz/torrent/mini/index.html"
			}
		}, {
			id: "sonarr",
			title: "Sonarr",
			subTitle: "Usenet PVR",
			icon: "sonarr",
			params: {
				page: "url",
				href: "https://jed.bz/nzbdrone/"
			}
		}, {
			id: "nzbget",
			title: "nzbget",
			subTitle: "Download some shit on usenet",
			icon: "download-cloud",
			params: {
				page: "url",
				href: "https://jed.bz/nzbget/"
			}
		}, {
			id: "git",
			title: "Repositories",
			subTitle: "Host my code in git",
			icon: "git",
			params: {
				page: "url",
				href: "https://jed.bz/git/Repository/Index"
			}
		}, {
			id: "files",
			title: "Files",
			subTitle: "Files uploaded",
			icon: "list",
			params: {
				page: "url",
				href: "https://jed.bz/files"
			}
		}, {
			id: "kodi-lr",
			title: "Living room",
			subTitle: "Kodi in the living room",
			icon: "kodi",
			params: {
				page: "url",
				href: "http://192.168.1.85/addons/webinterface.chorus/#remote"
			}
		}, {
			id: "kodi-br",
			title: "Bedroom",
			subTitle: "Kodi in the bedroom",
			icon: "kodi",
			params: {
				page: "url",
				href: "http://192.168.1.103/addons/webinterface.chorus/#remote"
			}
		}, {
			title: "Router",
			subTitle: "DD-WRT router",
			icon: "router",
			params: {
				page: "url",
				href: "http://jed.bz:11051/"
			}
		}];

		if (user.super) {
			return callback(null, items);
		} else {
			var filtered = items.filter(function(item) {
				return user.access.indexOf(item.id) > -1;
			});
			return callback(null, filtered);
		}
	}
}