
import moment from 'jalali-moment';
import MeetingTypList from '@/components/MeetingTypList';
const Home = () => {
  const now = moment().locale('fa'); // تاریخ جلالی و زبان فارسی
  const time = now.format('HH:mm'); // زمان به فرمت ۲۴ ساعته
  const date = now.format('dddd، jD jMMMM jYYYY'); // فرمت تاریخ شمسی

  return (
    <section className="relative flex size-full flex-col gap-10">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover" dir='rtl'>
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[220px] rounded py-2 text-center tex-base font-normal">
            قرارهای آینده ساعت ۴:۳۰
          </h2>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-gray-200">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypList />
    </section>
  );
};

export default Home;
