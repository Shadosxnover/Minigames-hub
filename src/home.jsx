import React from 'react';

const MinigameLanding = () => {
    const minigames = [
        { id: 1, name: 'Minigame 1', image: 'https://cdn.dribbble.com/users/754943/screenshots/3745104/media/b5b85b9b062107e07eef68d20c30ee44.png?resize=400x300&vertical=center' },
        { id: 2, name: 'Minigame 2', image: 'https://static.vecteezy.com/system/resources/thumbnails/042/410/136/small/tic-tac-toe-xo-game-hand-drawn-grid-doodle-template-illustration-vector.jpg' },
        { id: 3, name: 'Minigame 3', image: 'https://play-lh.googleusercontent.com/hSuOQgMElmnsBMw-F5ZrqWSnpf3nZ2AmZPdNALD7G2CRKSxM8ia07ogmkIrAqHIvzKR5' },
    ];

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center p-6 relative">
            <h1 className="absolute top-14 left-0 right-0 mx-auto w-fit h-auto py-4 flex justify-center items-center bg-gradient-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
                Welcome to Minigames Hub
            </h1>
            <span className="absolute top-14  w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
                Welcome to Minigames Hub
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-40">
                {minigames.map((minigame) => (
                    <div
                        key={minigame.id}
                        className="bg-gradient-to-r from-blue-500 via-teal-500 to-pink-500 p-5 rounded-lg shadow-lg shadow-blue-500/50 transform transition duration-300 hover:scale-105"
                    >

                        <h2 className="text-white text-2xl font-semibold mb-3">{minigame.name}</h2>
                        <img
                            src={minigame.image}
                            alt={minigame.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <button onClick={() => window.location.href = `/minigame${minigame.id}`} className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-500 transition">
                            Play Now
                        </button>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default MinigameLanding;
