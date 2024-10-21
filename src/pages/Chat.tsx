import Navbar from "../components/navbar.tsx";
import {Input} from "../components/ui/input.tsx";
import {useState} from "react";

const Chat = () => {
    const chats = [
        {
            id: 1,
            name: "Sarvar Jumaniyozov"
        },
        {
            id: 2,
            name: "Ahmadjon Nematov"
        },
        {
            id: 3,
            name: "Juratbek Xudayberganov"
        },
        {
            id: 4,
            name: "Rustam Shoahmedov"
        },
        {
            id: 5,
            name: "Bekzod Karimov"
        },
        {
            id: 6,
            name: "Otabek Nazarov"
        },
        {
            id: 7,
            name: "Gulnora Qosimova"
        },
        {
            id: 8,
            name: "Farhod Usmonov"
        },
        {
            id: 9,
            name: "Azizbek Norboev"
        },
        {
            id: 10,
            name: "Dilnoza Fayzullaeva"
        },
        {
            id: 11,
            name: "Shoxrux Yusupov"
        },
        {
            id: 12,
            name: "Nigora Mamatqulova"
        },
        {
            id: 13,
            name: "Jamshid Rahmatov"
        },
        {
            id: 14,
            name: "Muxlisa Rakhmatova"
        },
        {
            id: 15,
            name: "Mirjalol Abdurashidov"
        },
        {
            id: 16,
            name: "Kamoliddin Axmedov"
        },
        {
            id: 17,
            name: "Xurshidbek Qobilov"
        },
        {
            id: 18,
            name: "Lola Mirzayeva"
        },
        {
            id: 19,
            name: "Sardorbek Akhmedov"
        },
        {
            id: 20,
            name: "Oydin Qobilova"
        },
        {
            id: 21,
            name: "Dildora Xodjayeva"
        },
        {
            id: 22,
            name: "Islomjon Matkarimov"
        },
        {
            id: 23,
            name: "Zokirjon Bekmurodov"
        },
        {
            id: 24,
            name: "Xurshidbek Samiev"
        },
        {
            id: 25,
            name: "Maftuna Yuldasheva"
        },
        {
            id: 26,
            name: "Doston Usmanov"
        },
        {
            id: 27,
            name: "Laylo Ibrokhimova"
        },
        {
            id: 28,
            name: "Zokir Bekchanov"
        },
        {
            id: 29,
            name: "Anvarbek Yusupov"
        },
        {
            id: 30,
            name: "Dilshodbek Norboev"
        },
        {
            id: 31,
            name: "Madina Karimova"
        },
        {
            id: 32,
            name: "Shahnoza Mirzaeva"
        },
        {
            id: 33,
            name: "Ulugbek Otajonov"
        },
        {
            id: 34,
            name: "Murodil Mamadaliyev"
        },
        {
            id: 35,
            name: "Shukurullo Hayitov"
        },
        {
            id: 36,
            name: "Gulchehra Rasulova"
        },
        {
            id: 37,
            name: "Ravshanbek Olimov"
        },
        {
            id: 38,
            name: "Muslima Saydaliyeva"
        },
        {
            id: 39,
            name: "Rustam Karimov"
        },
        {
            id: 40,
            name: "Dilshod Akhmedov"
        }
    ];

    const [chatInputHeight, setChatInputHeight] = useState(50);

    const sampleChat = [
        {
            id: 1,
            message: "Assalomu aleykum",
            senderChat: "USER"
        },
        {
            id: 2,
            message: "Vaaleykum assalom",
            senderChat: "EMPLOYEE"
        },
        {
            id: 3,
            message: "Ertaga soat 10:00 ga bron qilgandim, vaqtingiz bormi?",
            senderChat: "USER"
        },
        {
            id: 4,
            message: "Ha albatta",
            senderChat: "EMPLOYEE"
        },
    ]

    return (
        <>
            <Navbar name={"Chat"}/>

            <div className={"flex gap-4"}>
                <div className={"w-[30%] flex flex-col gap-5"}>
                    <Input placeholder={"Qidiruv"} className={"py-[5px]"}/>

                    <div className={"flex flex-col gap-2 bg-grey_one px-2 py-4 overflow-y-scroll h-[75vh]"}>
                        {
                            chats.map(chat => (
                                <div
                                    key={chat.id}
                                    className={`flex items-center gap-4 cursor-pointer border-b w-full rounded-lg p-2 hover:duration-200 ${chat.id === 2 ? "bg-primary text-white hover:bg-primary" : "hover:bg-gray-200"}`}
                                >
                                    <img src="/avatar.svg" alt="#" className={"size-10"}/>
                                    <h1>{chat.name}</h1>
                                    {
                                        [1, 4, 6].includes(chat.id) && (
                                            <div
                                                className="min-w-[1.25rem] h-5 px-2 text-sm bg-red-600 text-white rounded-full flex justify-center items-center"
                                            >
                                                <span>12</span>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className={"flex w-[65%] flex-col justify-between"}>
                    <div className={"flex justify-between bg-grey_two p-2 rounded"}>
                        <div className={"flex gap-4 items-center"}>
                            <img src="/avatar.svg" alt="#" className={"size-9"}/>
                            <h1>Juratbek Xudayberganov</h1>
                        </div>

                        <div className={"flex gap-3 items-center"}>
                            <img src="/call.svg" alt="#" className={"size-5 cursor-pointer select-none"}/>
                            <img src="/delete-2.svg" alt="#" className={"size-5 cursor-pointer select-none"}/>
                        </div>
                    </div>

                    <div className={"flex flex-col justify-end gap-3 h-full mb-4 text-sm"}>
                        {
                            sampleChat.map((chat, index) => (
                                <h1
                                    key={index}
                                    className={`${chat.senderChat === "EMPLOYEE" ? "self-end bg-primary text-white " : "bg-grey_two self-start"} rounded-xl px-3 py-2 max-w-[50%]`}
                                >
                                    {chat.message}
                                </h1>
                            ))
                        }
                    </div>

                    <div className={"bg-grey_two flex gap-3 text-sm justify-between p-2 rounded-md"}>
                       <textarea
                           className="bg-transparent w-full outline-none resize-none max-h-52"
                           placeholder="Xabar yuborish"
                           style={{height: chatInputHeight ? `${chatInputHeight}px` : 'auto'}}
                           onChange={(e) => {
                               const value = e.target.value;
                               setChatInputHeight(value ? e.target.scrollHeight : 0);
                           }}
                       />
                        <img src="/send.svg" alt="#"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;