import React from "react";

function Button({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="bg-green-500 hover:bg-green-700 text-white text-xl md:text-2xl font-bold py-2 px-4 rounded"
		>
			{children}
		</button>
	);
}

export default Button;
