const sizes = {
	mobileS: "320px",
	mobileM: "375px",
	mobileL: "425px",
	tablet: "768px",
	laptop: "1280px",
	laptopL: "1440px",
	desktopM: "1920px",
	desktopL: "2560px",
};

const CSS_CONSTANTS = {
	DEVICES: {
		mobileS: `(max-width: ${sizes.mobileS})`,
		mobileM: `(max-width: ${sizes.mobileM})`,
		mobileL: `(max-width: ${sizes.mobileL})`,
		tablet: `(max-width: ${sizes.tablet})`,
		laptop: `(max-width: ${sizes.laptop})`,
		laptopL: `(max-width: ${sizes.laptopL})`,
		desktopM: `(max-width: ${sizes.desktopM})`,
		desktopL: `(max-width: ${sizes.desktopL})`,
	},
	COLORPALLETS: {
		primary: "",
		secondary: "#ffd700",
	},
	FONTS: {
		primary: "",
		secondary: "",
	},
	PADDINGS: {
		primary: "75px",
		mobileM: "20px",
		tablet: "25px"
	},
	RGBA: {
		secondary: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
	},
};

export default CSS_CONSTANTS;
