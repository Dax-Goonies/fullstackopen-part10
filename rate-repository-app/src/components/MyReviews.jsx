import useCurrentUser from '../hooks/useCurrentUser';
import UserReviews from './UserReviews';
import useDeleteReview from '../hooks/useDeleteReview';

// List of the user own reviews, rendering UserReviews component
const MyReviews = () => {
  const { user, loading, refetch } = useCurrentUser(true);
  const [deleteReview] = useDeleteReview();

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return null;
  if (!user) return null;

  const reviewNodes = user.reviews
    ? user.reviews.edges.map((edge) =>edge.node)
    : [];

    return <UserReviews reviews={reviewNodes} onDelete={handleDelete} />;
};

export default MyReviews;