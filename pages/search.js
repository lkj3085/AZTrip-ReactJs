import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";

function Search({ searchResults }) {
  const router = useRouter();

  const { location, startDate, endDate, noOfGuests } = router.query;
  const forMattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const forMattedEndDate = format(new Date(endDate), "dd MMMM yy");

  const range = `${forMattedStartDate} - ${forMattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow pt-14 px-6 ">
          <p className="text-xs">
            300+ Stays - {range} - For {noOfGuests} Number Of Guests{" "}
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays In {location}
          </h1>

          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">취소 된 따끈따끈 모음</p>
            <p className="button">Type Of Place</p>
            <p className="button">가격</p>
            <p className="button">Room And Bed</p>
            <p className="button">더 보기</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
