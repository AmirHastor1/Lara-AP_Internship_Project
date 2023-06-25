-- Table dbo.Like
create table
	[dbo].[Like]
(
	[UserId] uniqueidentifier not null
	, [BlogId] uniqueidentifier not null
);
GO
-- Relationship Fk_User_Like_UserId
alter table [dbo].[Like]
add constraint [Fk_User_Like_UserId] foreign key ([UserId]) references [dbo].[User] ([UserId]);
GO
-- Relationship Fk_Blog_Like_BlogId
alter table [dbo].[Like]
add constraint [Fk_Blog_Like_BlogId] foreign key ([BlogId]) references [dbo].[Blog] ([BlogId]);