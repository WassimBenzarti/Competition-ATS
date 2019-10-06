import React from 'react'
import styled from 'styled-components';

function Text({ style,
	grayed,
	inline,
	small,
	bold,
	capitalize,
	ellipsis,
	noMargin,
	...props }) {
	return (
		<p {...props}
			ellipsis={ellipsis}
			style={{
				fontSize: small ? 14 : 18,
				fontWeight: bold ? "bold" : 500,
				textTransform: capitalize && "capitalize",
				fontFamily: small ? "Poppins" : "Poppins, Roboto, serif",
				display: (inline ? "inline-block" : (ellipsis ? "-webkit-box" : "block")),
				opacity: grayed ? .7 : 1,
				marginBottom: noMargin ? 5 : 15,
				WebkitLineClamp: ellipsis && ((typeof ellipsis == "object") ? ellipsis.rows : 1),
				...style
			}} />
	)
}

const MarkText = styled(Text)`
	background-color:#e6f7ff;
	cursor:pointer;
	padding:0px 0px;
	&:hover{
		background-color:#1890ff;
		color:white;
	}
`

Text.Mark = function Mark({ ...props }) {
	return (<MarkText inline {...props} />)
}

export default Text
