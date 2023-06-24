﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

using SocialMediaApp.BLL.Data;
using SocialMediaApp.BLL.Interfaces;
using SocialMediaApp.DAL.Interfaces;
using AutoMapper;
using SocialMediaApp.DAL.Data;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Runtime.ConstrainedExecution;
using SocialMediaApp.DAL.Repositories;


namespace SocialMediaApp.BLL.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;


        public BlogService(IBlogRepository blogRepository, IUserRepository userRepository, IMapper mapper, IConfiguration config)
        {
            _blogRepository = blogRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _config = config;
        }
        public IEnumerable<BlogDTO> GetBlogs()
        {
            var blogs = _blogRepository.GetBlogs();

            List<BlogDTO> convertedBlogs = new List<BlogDTO>();
            convertedBlogs = _mapper.Map<List<BlogDTO>>(blogs);
            foreach (var blogDTO in convertedBlogs)
            {
                blogDTO.Username = _userRepository.GetUsernameById(blogDTO.UserId);
            }

            return convertedBlogs;

        }

        public IEnumerable<BlogDTO> GetUserBlogs(Guid userId)
        {

            var blogs = _blogRepository.GetUserBlogs(userId);

            List<BlogDTO> convertedBlogs = new List<BlogDTO>();
            convertedBlogs = _mapper.Map<List<BlogDTO>>(blogs);
            foreach (var blogDTO in convertedBlogs)
            {
                blogDTO.Username = _userRepository.GetUsernameById(blogDTO.UserId);
            }
            return convertedBlogs;
        }

        public void AddNewBlog(BlogCreateDTO blog)
        {
            _blogRepository.AddNewBlog(blog.UserId, blog.BlogImage, blog.BlogDescription);
        }
    }
}
