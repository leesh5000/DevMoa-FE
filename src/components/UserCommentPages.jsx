import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Categories from "../utils/Categories.jsx";
import {DateConverter} from "../utils/DateConverter.jsx";
import {Loading} from "./Loading.jsx";
import {Footer} from "./Footer.jsx";
import ReactPaginate from "react-paginate";
import {fetchUserCommentPages, setPage, setSort} from "../actions/UserCommentPageActions.jsx";

export const UserCommentPages = ({id}) => {

  const dispatch = useDispatch();
  const userCommentPages = useSelector(state => state.userCommentPage);
  const pageInfo = userCommentPages.page_info;
  const startItem = Math.min(pageInfo.page * pageInfo.size + 1, userCommentPages.total_elements);
  const endItem = Math.min((pageInfo.page + 1) * pageInfo.size, userCommentPages.total_elements);

  useEffect(() => {
    dispatch(fetchUserCommentPages(id, pageInfo));
  }, [pageInfo]);

  const onCreatedSortHandler = () => {
    const order = pageInfo.sort.split(",")[1];
    const sort = "created_at," + (order === "desc" ? "asc" : "desc");
    dispatch(setSort(sort));
  }

  const onLikeSortHandler = () => {
    const order = pageInfo.sort.split(",")[1];
    const sort = "like_count," + (order === "desc" ? "asc" : "desc");
    dispatch(setSort(sort));
  }

  const onViewsSortHandler = () => {
    const order = pageInfo.sort.split(",")[1];
    const sort = "view_count," + (order === "desc" ? "asc" : "desc");
    dispatch(setSort(sort));
  }

  const onPageChangeHandler = (e) => {
    dispatch(setPage(e.selected));
  };

  if (!userCommentPages.content) {
    return (
      <Loading/>
    )
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-12 px-2 py-3">
              탭
            </th>
            <th scope="col" className="w-[480px] px-2 py-3">
              댓글 내용
            </th>
            <th scope="col" className="w-20 px-2 py-3 cursor-pointer" onClick={onCreatedSortHandler}>
              <div className="flex items-center justify-center">
                작성일
                <a>
                  <svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </a>
              </div>
            </th>
            <th scope="col" className="w-16 px-2 py-3 cursor-pointer" onClick={onLikeSortHandler}>
              <div className="flex items-center justify-center">
                추천
                <a>
                  <svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                  </svg>
                </a>
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            userCommentPages.content?.map((comment, index) => {
              return (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-2 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-white">
                    <strong className="font-semibold">{comment.post?.category === null ? '-' : Categories[comment.post?.category]}</strong>
                  </th>
                  <td className="h-10 text-left px-2 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    <Link to={`/posts/${encodeURI(comment.post?.title)}`} state={{id : comment.post?.id}}
                          className="text-sky-700 hover:text-sky-500 hover:underline hover:cursor-pointer"
                          dangerouslySetInnerHTML={{__html: comment.contents}}
                    />
                  </td>
                  <td className="px-2 py-4">
                    {DateConverter(comment.created_at)}
                  </td>
                  <td className="px-2 py-4">
                    {comment.like_count}
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
      <div className="relative mt-8 mb-20">
        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{startItem} - {endItem}</span> of <span className="font-semibold text-gray-900 dark:text-white">{userCommentPages.total_elements}</span></span>
          <ReactPaginate
            forcePage={pageInfo.page}
            containerClassName="pagination"
            activeLinkClassName="active-link"
            breakLabel="..."
            nextLabel="Next"
            onPageChange={onPageChangeHandler}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={userCommentPages?.total_pages}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
          />
        </nav>
      </div>
      <Footer/>
    </>
  );
};
