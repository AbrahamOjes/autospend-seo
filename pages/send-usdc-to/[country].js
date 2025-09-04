import { countriesData } from '../../data/countries-data';
import CountryTemplate from '../../components/CountryTemplate';

export default function CountryPage({ country }) {
  return <CountryTemplate country={country} />;
}

export async function getStaticPaths() {
  const paths = countriesData.map((country) => ({
    params: { country: country.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const country = countriesData.find(c => c.slug === params.country);
  
  if (!country) {
    return { notFound: true };
  }

  return {
    props: { country },
    revalidate: 3600, // Revalidate every hour
  };
}
