'use client';
import HomeCards from "./HomeCard";
import { Plus, Calendar, UserRoundPlus, Video } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
const MeetingTypList = () => {
    const [meetingState, setMeetingState] = useState(undefined);
    const router = useRouter()
    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCards
                title="شروع گفتگو جدید"
                description="همین حالا یک گفتگو جدید آغاز کنید."
                handleClick={() => setMeetingState('isJoiningMeeting')} // Wrap in a function
                className=""
            >
                <Plus width={50} height={32} />
            </HomeCards>
            <HomeCards
                title="ورود به گفتگو"
                description="ورود نیازمند یک لینک دعوت می‌باشد."
                handleClick={() => setMeetingState('isJoiningMeeting')} // Wrap in a function
                className="bg-blue-2"
            >
                <UserRoundPlus width={40} height={32} />
            </HomeCards>
            <HomeCards
                title="گفتگو در آینده"
                description="یک گفتگو برنامه ریزی کنید."
                handleClick={() => setMeetingState('isScheduleMeeting')} // Wrap in a function
                className="bg-orange-1"
            >
                <Calendar width={50} height={32} />
            </HomeCards>
            <HomeCards
                title="تماشای ضبط شده‌ها"
                description="تماشای گفتگوهای ضبط شده"
                handleClick={() => setMeetingState('isInstantMeeting')} // Wrap in a function
                className="bg-purple-1"
            >
                <Video width={50} height={32} />
            </HomeCards>
        </section>
    );
};

export default MeetingTypList;
