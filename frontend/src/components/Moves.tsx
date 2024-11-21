function Moves({ moves }: { moves: string[] }) {
	return (
		<div className="col-span-2 bg-slate-800 text-white p-2 rounded-sm overflow-y-scroll max-h-[500px]">
			<h2 className="text-xl text-center">Moves</h2>
			<hr className="my-2" />
			<div
				className="flex flex-wrap justify-center gap-2 [&>*:nth-child(odd)]:text-white 
[&>*:nth-child(even)]:text-green-500 "
			>
				{moves.map((move, index) => (
					<span key={index}>
						{index + 1}.{move}
					</span>
				))}
			</div>
		</div>
	);
}

export default Moves;
