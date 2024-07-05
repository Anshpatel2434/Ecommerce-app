const Loading = () => {
	return (
		<section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center min-h-screen w-screen">
			{/* Rotating rings */}
			<div className="relative flex items-center justify-center w-40 h-40 mb-10">
				<div className="absolute inset-0 w-full h-full border-4 border-t-transparent border-blue-700 rounded-full animate-spin"></div>
				<div className="absolute inset-5 w-3/4 h-3/4 border-8 border-blue-600 rounded-full animate-ping"></div>
				<div className="absolute inset-10 w-1/2 h-1/2 border-4 border-b-transparent border-blue-500 rounded-full animate-spin"></div>
			</div>

			{/* Glowing text */}
			<div className="relative">
				<p className="text-white text-4xl font-bold animate-glow">Loading</p>
				<div className="absolute top-0 left-0 right-0 flex justify-center space-x-2 mt-10">
					<div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
					<div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-200"></div>
					<div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-400"></div>
				</div>
			</div>
		</section>
	);
};

export default Loading;
