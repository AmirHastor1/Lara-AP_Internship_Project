using AutoMapper;
using SocialMediaApp.BLL.Data;
using SocialMediaApp.DAL.Data;

namespace SocialMediaApp.AutoMapperProfile
{
    public class AutoMapperProfile: Profile

    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Blog, BlogDTO>().ReverseMap();
            //CreateMap<Book, BookDTO>().ReverseMap();
            // CreateMap<Book, BookDTO>().ForMember(x=> x.Author, options => options.Ignore());
            //CreateMap<Rental, RentalDTO>().ForSourceMember(x => x.Book, opt => opt.DoNotValidate()).ReverseMap();//.ForMember(x=> x.Book, opt => opt.Ignore());
        }

    }
}