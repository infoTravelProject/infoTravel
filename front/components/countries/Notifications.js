import Button from "@/components/Button";

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
                        <Button type={"toggle"}/>
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
