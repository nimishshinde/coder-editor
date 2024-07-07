import React from 'react';
import Avatar from 'react-avatar';

function Cilent({ userName }) {
	return (
		<div className="client">
			<Avatar
				name={userName}
				size={50}
				round="14px"
			/>
			<span className="userName">{userName}</span>
		</div>
	);
}

export default Cilent;
