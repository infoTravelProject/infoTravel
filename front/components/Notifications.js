const Notifications = ({ items }) => (
    <div className="bg-gray-800 text-white flex flex-col">
        <div className="bg-[#414141] p-2">
            <h4 className="ml-3 text-base font-bold text-gray-300">News and notifications</h4>
        </div>
        <div className="bg-[#19191a]">
            <ul className="space-y-4 mt-1 px-4 py-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4">
                        {/* Toggle switch */}
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-blue-500"></div>
                            <div
                                className="absolute left-1 top-1 bg-white border border-gray-300 rounded-full w-4 h-4 transition-all peer-checked:translate-x-5 peer-checked:border-blue-500"
                            ></div>
                        </label>

                        {/* Text */}
                        <div>
                            <span className="font-bold text-gray-300 text-sm">{item.label}</span>
                            {item.description && (
                                <span className="text-gray-400"> - {item.description}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default Notifications;
