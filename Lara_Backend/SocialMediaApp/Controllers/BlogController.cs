﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMediaApp.BLL.Data;
using SocialMediaApp.BLL.Interfaces;
using System.Collections.Generic;

namespace SocialMediaApp.Controllers
{
    [Route("api/blogs")]
    [ApiController]
    [Authorize]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpPost]
        [Route("create")]
        public void AddNewBlog(BlogCreateDTO blog)
        {
            _blogService.AddNewBlog(blog);
        }

        [HttpGet]
        [Route("all"), AllowAnonymous]
        public IEnumerable<BlogDTO> GetBlogs()
        {
            return _blogService.GetBlogs();
        }

        [HttpGet]
        [Route("all/user"), AllowAnonymous]
        public IEnumerable<BlogDTO> GetUserBlogs(Guid userId)
        {
            return _blogService.GetUserBlogs(userId);
        }

        
    }
}
