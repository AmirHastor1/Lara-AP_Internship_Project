-- Table dbo.Comment
create table
	[dbo].[Comment]
(
	[CommentId] uniqueidentifier not null
	, [BlogId] uniqueidentifier not null
	, [UserId] uniqueidentifier not null
	, [Username] nvarchar(50) not null
	, [CommentText] nvarchar(max) not null
,
constraint [Pk_Comment_CommentId] primary key clustered
(
	[CommentId] asc
)
);
GO
-- Relationship Fk_User_Comment_UserId
alter table [dbo].[Comment]
add constraint [Fk_User_Comment_UserId] foreign key ([UserId]) references [dbo].[User] ([UserId]);
GO
-- Relationship Fk_Blog_Comment_BlogId
alter table [dbo].[Comment]
add constraint [Fk_Blog_Comment_BlogId] foreign key ([BlogId]) references [dbo].[Blog] ([BlogId]);