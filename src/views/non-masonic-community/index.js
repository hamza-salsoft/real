import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Layout,
  Avatar,
  Image,
  Button,
  DatePicker,
  Select,
  Input,
  Popover,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { POST, UPLOADS_URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostBox from "../../components/PostBox";
import SocialBox from "../../components/SocialBox";
import SocialBoxLoading from "../../components/SocialBox/loading";
import { Get } from "../../config/api/get";
import { FaFilter, FaSearch } from "react-icons/fa";

function NonmasonicCommunity() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [editMode, setEditMode] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });

  const [filter, setFilter] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
  });

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async (
    pageNumber,
    pageLimit = 10,
    search,
    reset = false
  ) => {
    setLoading(true);
    const response = await Get(`${POST.getAllNonMemberPosts}`, token, {
      page: pageNumber ? pageNumber.toString() : "1",
      limit: pageLimit,
      keyword: search ? search : null,
      from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
      to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
    });

    if (response?.status) {
      console.log(">>>>>", response?.data?.posts);

      if (pageNumber && pageNumber > 1) {
        setPosts([...posts, ...response?.data?.posts]);
      } else {
        setPosts(response.data.posts);
      }

      if (
        response?.data?.totalCount == posts.length ||
        response?.data?.posts.length == 0
      ) {
        setHasMore(false);
        setLoading(false);
        return;
      }
    } else {
      console.log("error====>", response);
    }
    setLoading(false);
  };

  const handleScroll = (event) => {
    console.log(event);
    const target = event.target;
    const isScrolledToBottom =
      target.scrollHeight - target.scrollTop == target.clientHeight;

    if (isScrolledToBottom) {
      if (hasMore && !loading) {
        getAllPosts(page + 1);

        //   const scrollOffset = 50; // Adjust this value to control how much you want to scroll up
        // target.scrollTo({
        //   top: target.scrollTop - scrollOffset,
        //   behavior: 'smooth', // Use 'auto' for instant scrolling
        // });

        setPage(page + 1);
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getAllPosts(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

  const handleStatusChange = (value) => {
    setFilter({
      ...filter,
      status: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
    getAllPosts(paginationConfig.pageNumber, paginationConfig.limit, "", true);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleFrom = (date) => {
    setFilter({
      ...filter,
      from: date,
    });
  };

  const handleTo = (date) => {
    setFilter({
      ...filter,
      to: date,
    });
  };

  const handleLimitChange = (pageSize) => {
    setPaginationConfig({
      ...paginationConfig,
      limit: pageSize,
      current: 1,
    });

    getAllPosts(1, pageSize);
  };

  // const handleStatus = async () => {
  //   try {
  //     const index = books.findIndex((user) => user._id == selectedBook._id);

  //     console.log(index);
  //     const response = await Get(
  //       BOOK.toggleStatus + "/" + selectedBook._id,
  //       token,
  //       {}
  //     );
  //     const newBook = [...books];

  //     console.log(">>>>", newBook[index].isActive);
  //     console.log(">>>>", selectedBook.isActive);
  //     newBook[index].status =
  //       newBook[index].status == "ACTIVE" ? "INACTIVE" : "ACTIVE";
  //     setModalOpen(false);
  //     setBooks(newBook);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const filterContent = (
    <div className="filterDropdown">
      <div>
        <p className="mainLabel" style={{ padding: "10px" }}>
          Filter
        </p>
      </div>
      <hr style={{ margin: 0 }} />

      <div className="filterDropdownBody">
        <p className="mainLabel">Creation Date:</p>
        <DatePicker
          className="mainInput filterInput"
          value={filter.from}
          onChange={(e) => handleFrom(e)}
        />
        <DatePicker
          className="mainInput filterInput"
          value={filter.to}
          onChange={(e) => handleTo(e)}
        />

        <p className="mainLabel">Filter by Status:</p>

        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Status"
          value={filter.status}
          onChange={(e) => handleStatusChange(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getAllPosts()}
        >
          Apply
        </Button>
        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          className="mainButton primaryButton2 bg-red-500"
          onClick={() => resetFilter()}
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <Layout className="configuration">
      <div
        className="boxDetails"
        onScroll={(e) => handleScroll(e)}
        style={{ minHeight: "80vh", overflowY: "auto" }}
      >
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Non Member Community
            </h1>
          </Col>
        </Row>
        <br />
        <>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={24} md={19}>
              <PostBox isMasonic={false} getAllPosts={getAllPosts} />
              <Row style={{ padding: "10px 20px" }}>
                <Col xs={24} md={12}>
                  <h5 style={{ display: "inline", fontSize: 16 }}>Show : </h5>
                  <Select
                    size={"large"}
                    className="chartSelectBox"
                    defaultValue={paginationConfig.limit}
                    onChange={(e) => handleLimitChange(e)}
                    style={{
                      width: 70,
                      textAlign: "left",
                    }}
                    options={[
                      { value: 10, label: "10" },
                      { value: 20, label: "20" },
                      { value: 30, label: "30" },
                      { value: 40, label: "40" },
                      { value: 50, label: "50" },
                    ]}
                  />
                  &emsp;
                  <h5 style={{ display: "inline", fontSize: 16 }}>Entries</h5>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Input
                    style={{ width: "250px" }}
                    className="mainInput dashInput"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                    suffix={
                      <FaSearch
                        style={{
                          color: "#3c5a92",
                          fontSize: 16,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          getAllPosts(1, paginationConfig.limit, filter.keyword)
                        }
                      />
                    }
                    onPressEnter={(e) =>
                      getAllPosts(1, paginationConfig.limit, filter.keyword)
                    }
                  />
                  &emsp;
                  <Popover
                    content={filterContent}
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    placement="bottomRight"
                    arrow={false}
                  >
                    <Button
                      style={{
                        padding: "10px 15px",
                        height: "auto",
                        // backgroundColor: "#3c5a92",
                      }}
                      className="fltr-btn"
                    >
                      <FaFilter style={{ fontSize: "16px", color: "white" }} />
                    </Button>
                  </Popover>
                </Col>
              </Row>
              {loading && <SocialBoxLoading />}
              {posts.length > 0 &&
                posts.map((item) => {
                  return <SocialBox post={item} />;
                })}

              {!loading && posts.length == 0 && (
                <div
                  className="social-post-box"
                  style={{
                    minHeight: "50vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h1 className="pageTitle" style={{ margin: 0 }}>
                    No Posts Found
                  </h1>
                </div>
              )}
            </Col>
          </Row>
        </>
      </div>
    </Layout>
  );
}
export default NonmasonicCommunity;
