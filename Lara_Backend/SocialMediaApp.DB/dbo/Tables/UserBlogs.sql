-- Table dbo.UserBlogs
create table
	[dbo].[UserBlogs]
(
	[BlogId] uniqueidentifier not null
	, [UserId] uniqueidentifier not null
,
constraint [Pk_UserBlogs_BlogId] primary key clustered
(
	[BlogId] asc
)
);
GO
--**********************************************************************
--	Data
--**********************************************************************
--**********************************************************************
--	Relationships
--**********************************************************************

-- Relationship Fk_User_UserBlogs_UserId
alter table [dbo].[UserBlogs]
add constraint [Fk_User_UserBlogs_UserId] foreign key ([UserId]) references [dbo].[User] ([UserId]);