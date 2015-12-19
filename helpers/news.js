module.exports = function (index, prop) {
    // /images/placeholder_480x270.gif is the default image if there's no data
    const news = [
        {
            title: 'CLE Tips for Finals',
            image: 'https://news.library.ucsf.edu/wp-content/uploads/2015/12/CLETipsFinals-480x270.jpg',
            link: 'https://news.library.ucsf.edu/2015/12/cle-tips-for-finals/'
        },
        {
            title: 'Access to Streaming Clinical Skills Videos',
            image: 'https://news.library.ucsf.edu/wp-content/uploads/2015/11/Bates-480x270.jpg',
            link: 'https://news.library.ucsf.edu/2015/11/access-to-streaming-clinical-skills-videos/'
        },
        {
            title: 'Acland’s Video Atlas of Human Anatomy',
            image: 'https://news.library.ucsf.edu/wp-content/uploads/2015/11/HandBone-480x270.jpg',
            link: 'https://news.library.ucsf.edu/2015/11/aclands-video-atlas-of-human-anatomy/'
        },
        {
            title: 'FINDINGS: Your Online Experience with the Library',
            image: 'https://news.library.ucsf.edu/wp-content/uploads/2015/10/Feedback1-480x270.jpg',
            link: 'https://news.library.ucsf.edu/2015/11/always-collecting/'
        }
    ];
    return news[index][prop]
};