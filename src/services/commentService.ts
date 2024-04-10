import axios from 'axios';
import ApiBase from 'modules/apis/apiBase';

class CommentService extends ApiBase {
    getAllComments = (tourId: number) => {
        const url = `http://localhost:8080/api/v1/tour/${tourId}/comments`;
        return axios.get(url);
    };

    getCommentByParentId = (parent_comment_id: number, tour_id: number) => {
        const url = `http://localhost:8080/api/v1/tour/${tour_id}/comments/${parent_comment_id}`;
        return axios.get(url);
    };

    createComment = (requestBody: any) => {
        const url = 'http://localhost:8080/api/v1/comment';
        return axios.post(url, requestBody);
    };

    createReview = (requestBody: any) => {
        const url = 'http://localhost:8080/api/v1/review';
        return axios.post(url, requestBody);
    };

    getAllReviews = (tour_id: number) => {
        const url = `http://localhost:8080/api/v1/tour/${tour_id}/reviews`;
        return axios.get(url);
    };
}

const commentService = new CommentService();

export default commentService;
