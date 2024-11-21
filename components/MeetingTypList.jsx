'use client';
import HomeCards from "./HomeCard";
import { Plus, Calendar, UserRoundPlus, Video } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from './MeetingModal';

const MeetingTypList = () => {
    const [meetingState, setMeetingState] = useState(undefined);
    const router = useRouter()
    const createMeeting = () => {

    }
    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCards
                title="شروع گفتگو جدید"
                description="همین حالا یک گفتگو جدید آغاز کنید."
                handleClick={() => setMeetingState('isInstantMeeting')}
                className=""
            >
                <Plus width={50} height={32} />
            </HomeCards>
            <HomeCards
                title="ورود به گفتگو"
                description="ورود نیازمند یک لینک دعوت می‌باشد."
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-blue-2"
            >
                <UserRoundPlus width={40} height={32} />
            </HomeCards>
            <HomeCards
                title="گفتگو در آینده"
                description="یک گفتگو برنامه ریزی کنید."
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-orange-1"
            >
                <Calendar width={50} height={32} />
            </HomeCards>
            <HomeCards
                title="تماشا"
                description="تماشای گفتگوهای ضبط شده"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-purple-1"
            >
                <Video width={50} height={32} />
            </HomeCards>

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="شروع گفتگو جدید"
                className="text-center"
                buttonText="شروع گفتگو"
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypList;
