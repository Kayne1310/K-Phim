const axios = require('axios');

async function checkApi() {
    try {
        const homeRes = await axios.get('https://ophim1.com/v1/api/home');
        const homeData = homeRes.data;
        console.log('Home SEO type:', typeof homeData.data.seoOnPage);
        console.log('Home SEO keys:', Object.keys(homeData.data.seoOnPage || {}));
        console.log('Home BreadCrumb type:', Array.isArray(homeData.data.breadCrumb) ? 'array' : typeof homeData.data.breadCrumb);
        if (Array.isArray(homeData.data.breadCrumb) && homeData.data.breadCrumb.length > 0) {
            console.log('Home BreadCrumb Item keys:', Object.keys(homeData.data.breadCrumb[0]));
        }


        const movieRes = await axios.get('https://ophim1.com/v1/api/phim/nha-ba-nu'); // Example slug
        const movieData = movieRes.data;
        console.log('Movie SEO keys:', Object.keys(movieData.data.seoOnPage || {}));
        console.log('Movie BreadCrumb type:', Array.isArray(movieData.data.breadCrumb) ? 'array' : typeof movieData.data.breadCrumb);
        if (Array.isArray(movieData.data.breadCrumb) && movieData.data.breadCrumb.length > 0) {
            console.log('Movie BreadCrumb Item keys:', Object.keys(movieData.data.breadCrumb[0]));
        }

        // Check list response structure for pagination
        const listRes = await axios.get('https://ophim1.com/v1/api/danh-sach/phim-moi');
        const listData = listRes.data;
        console.log('List Response Params keys:', Object.keys(listData.data.params));

    } catch (error) {
        console.error(error.message);
    }
}

checkApi();
