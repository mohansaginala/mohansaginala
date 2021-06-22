const backendUrl = (() => {
    if(window.location.hostname === 'www.mohansaginala.com') {
        return 'https://mohansaginala.herokuapp.com';
    } else {
        return 'http://localhost:3000';
    }
})();
// Dynamic
const getAllAudioClips = backendUrl + '/audioClips';
const getBasicInfo = backendUrl + '/basicInfo';
const getAllDidYouKnow = backendUrl + '/didYouKnow';
const getAllFeaturedImages = backendUrl + '/featured/images';
const getAllInterests = backendUrl + '/interests';
const getAllPhotos = backendUrl + '/photos';
const getProfileDetails = backendUrl + '/profile';
const getAllRightNow = backendUrl + '/rightNow';
const getAllThoughts = backendUrl + '/thoughts';
const getAllVideos = backendUrl + '/videos';
// Dynamic

// Static
const staticUrl = 'https://static.mohansaginala.com';
// Static

export {
    getAllAudioClips,
    getBasicInfo,
    getAllDidYouKnow,
    getAllFeaturedImages,
    getAllInterests,
    staticUrl,
    getAllPhotos,
    getProfileDetails,
    getAllRightNow,
    getAllThoughts,
    getAllVideos
}