// import { describe } from "node:test";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null }
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  // console.log(JSON.stringify(posts, null, 2))
  // const posts = [
  //   {
  //     _CreatedAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, Name: "Hazem Elgindy" },
  //     _id: 1,
  //     description: "this is the post",
  //     image: "https://community.nasscom.in/sites/default/files/styles/560_x_350/public/media/images/startup.jpeg.webp?itok=06t_i_-s",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ];


  const session = await auth();
  console.log(session?.id)

  return (
    <>
      <section className="pink_container">

        <h1 className="heading">
          Pitch Your Startup <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>


      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results For: "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card-grid">
          {posts?.length > 0 ? (posts.map((post: StartupTypeCard, index: number) => (
            <StartupCard key={post?._id} post={post} />
          ))
          ) : (
            <p className="no-results"> No Startups found </p>
          )}
        </ul>

      </section>
    </>
  );
}
