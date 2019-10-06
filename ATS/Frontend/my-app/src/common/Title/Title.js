import React from "react"
import ResponsiveUtils from "../Responsivness/Responsivness";
import useWindowSize from "../useWindowSize/useWindowSize";

export default function Title({
	style,
	sub,
	bold,
	size,
	noMargin,
	...props }) {
	//eslint-disable-next-line
	const windowSize = useWindowSize()
	//eslint-disable-next-line
	return <h1 {...props} style={{
		fontSize: size || (sub
			? ResponsiveUtils.choose({ mobile: 16, other: 18 })
			: ResponsiveUtils.choose({ mobile: 25, other: 40 })),
		opacity: sub ? .6 : 1,
		textTransform: "capitalize",
		fontWeight: bold ? 800 : sub ? 400 : 600,
		fontFamily: "'Poppins', sans-serif",
		margin: noMargin ? 0 : undefined,
		...style,
	}} />
}