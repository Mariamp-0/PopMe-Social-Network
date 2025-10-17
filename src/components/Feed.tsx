import Post from "./Post";
import postsData from "../../public/data/postData.json";
import type { Post as PostType } from "../types/post";

export default function Feed() {

  // Tell TypeScript that the JSON is an array of posts
  const typedPosts = postsData as PostType[];

  return (

    // Main container for the feed, dark background and space between posts
    <div className="flex flex-col gap-6 p-6 bg-[#1e1c24] min-h-screen">

      {/* Loop through all posts and render a Post component for each */}
      {typedPosts.map((post) => (
        <Post
          key={post.id} 
          username={post.userName} 
          handle={post.userHandle} 
          movieTitle={post.movieTitle} 
          year={post.year} 
          review={post.reviewText} 
          rating={post.rating} 
          poster={post.movieImage} 

          // Popcorn image is a star for testing
          popcornUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAEZklEQVR4AYRVPYhdRRT+zuwGLAI2W4iF2KiNrIgSieS9NYqgBkWwsZCgkOzD7RUSLFbUQrSx0f2JCZJG0CooSopdd9dC/AHBVlQEiSgoFiKE7D1+35m5c+etTzLMOfOdc75zzsy98+5LuM6wiGctKGRSMiiBi10Wev9/Ng1besbSzlwDtQxiIrgUsWbgYpeF7kImAhpM2DQc6FADZG19Qg0bI/1sMXomciaX8NTEcDcNEWFwtGWczZsURlurxQw1M9do4tmBqYZ9uF+bfMKSQeS+mnxvcpdvrc7TnDlrDaVJwmHTDcERl4Dr9GSGRUZ27125zIN/63NXvvTtoenAsPK0LB5jTsp6OCFjcsUlEKBklzRLcdIFnuwRrg/JtIS7MffrM7TzFDWQXoRAsJqm3pxQMXEkJVGuuKHy9eI4A8Y5S6HuDDcZJk/ds5rVRa/2cMLqInBKLlFqZMP3Tt3DyJgNuORJ6u34/PST2ZqtyamB2Q0VblmlrXt6WaHcXgjcPa0uncWsMeNCJGYgBMPwr5dv1LvyneWJ7y2/4ruTC74zuWywEwOrQYZ7u93lz7qdyXu+u/wac54n/zHfOr1gDU0wwQ1xAU0mX8v2ymH8je/h+ARma3B7iYd9FoaHKaiC6WGwJR7oJGBnmfM2eR97sh+77ZWb6APoAEcyKhbMTYlxQ7cAswVBKEhQFu6GhsiSArOTBif3Tj1MbuAwDl29NTiWk1J7gcEOdnTtJxLeAIdnDlE/px15I1mLUWoKFvGLduzcF2GU3aQwqmJB5tt440U2fYcQ3AOIKZrhEShC/n9QcQAfYvTnc+Axq4fpBxqiPlo2XeHfwnlETTLBURb0awGiVBdpzLuE0R9Pm32wTywPhSzOAw2bn7kqjDdPseH5Unc4KBNZoU5Rq+F+Cd3NT0UzOqditA80VCXL9QnN9Bb3Xx06MaPM/O6zrnFT0F+3B1evRRHaLCNnlQMN5VcRMgUlae4E9MIbl9zZtKiLoqHqKT0aq7AEeVgspm9phqhDdsPs/PEcKr56FZvHnwmIC+D+BGaMnK2Pdy0gVm4mDe7at/gRMByHhk45tfp3wWvzg2OL/NLcImoWgwXIml8aFAc4PLATxXuZ3+dfkR0Ks1eOv2DdSVvaWISBj89+60Oxqq6jOaVekSJOOvRIo7Q8IR66qvsqCuA7br5oo82LMm20/qnj6p3EH1HyZAHOIzKMLUygCP2IT1uxY8mErIH9b8Lpfo339QWMNo6n8ebP4WMxrWl84Xcbr/M9+4Rn+Uc+c4s82nF/ULjgSGi/BHRoF/2ZbXzufXTdEaS5O9LS+pukMsxJXs/J+QZ+KDZsPt2GtH/UltbfCkpVOcdoJ+fWudZpsIoF7IHNr2y09kPgUNPx3Ngjy+5f+8WOvZu/neTOYtZHasYwRY+B3GHSnYtmHd8CRcNP4BRij5bEzYxLK5txlDj/LQDhOKlOG8FwIYZLFydhX8Tol9cimYH6tlyekOLKOy3GvwAAAP//PsVuigAAAAZJREFUAwAccGRUlcvQVwAAAABJRU5ErkJggg=="
        />
      ))}
    </div>
  );
}
