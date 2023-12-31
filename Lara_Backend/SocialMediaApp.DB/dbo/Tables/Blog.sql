﻿-- Model New Model
-- Updated 6/25/2023 5:12:14 PM
-- DDL Generated 6/25/2023 5:12:17 PM

--**********************************************************************
--	Tables
--**********************************************************************

-- Table dbo.Blog
create table
	[dbo].[Blog]
(
	[BlogId] uniqueidentifier not null
	, [UserId] uniqueidentifier not null
	, [BlogImage] image null
	, [BlogDescription] nvarchar(max) null
	, [BlogLikes] int null
	, [BlogComments] int null
	, [BlogDate] datetime2(7) not null
,
constraint [Pk_Blog_BlogId] primary key clustered
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

-- Relationship Fk_User_Blog_UserId
alter table [dbo].[Blog]
add constraint [Fk_User_Blog_UserId] foreign key ([UserId]) references [dbo].[User] ([UserId]);