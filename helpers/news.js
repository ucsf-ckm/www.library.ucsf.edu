module.exports = function (index, prop) {
    // /images/placeholder_480x270.gif is the default image if there's no data
    const news = [
        {
            title: 'Year-End Holiday Closure',
            image: 'https://news.library.ucsf.edu/wp-content/uploads/2015/12/LibraryClosure-480x270.jpg',
            link: 'https://news.library.ucsf.edu/2015/12/year-end-holiday-closure/'
        },
        {
            title: 'Happy Holidays!',
            image: 'https://news.library.ucsf.edu/wp-content/uploads/2015/12/SeasonsGreetings2015-480x270.jpg',
            link: 'https://news.library.ucsf.edu/2015/12/happy-holidays/'
        },
        {
            title: 'CLE Tips for Finals',
            image: 'https://news.library.ucsf.edu/wp-content/uploads/2015/12/CLETipsFinals-480x270.jpg',
            link: 'https://news.library.ucsf.edu/2015/12/cle-tips-for-finals/'
        },
        {
            title: 'Access to Streaming Clinical Skills Videos',
            image: 'https://news.library.ucsf.edu/wp-content/uploads/2015/11/Bates-480x270.jpg',
            link: 'https://news.library.ucsf.edu/2015/11/access-to-streaming-clinical-skills-videos/'
        }
    ];
    return news[index][prop]
};