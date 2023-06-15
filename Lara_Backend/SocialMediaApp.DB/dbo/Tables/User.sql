-- Model New Model
-- Updated 2/17/2012 7:00:00 AM
-- DDL Generated 6/13/2023 3:54:41 PM

--**********************************************************************
--	Tables
--**********************************************************************

-- Table dbo.User
create table
	[dbo].[User]
(
	[UserId] uniqueidentifier not null
	, [FirstName] nvarchar(50) not null
	, [LastName] nvarchar(50) not null
	, [Email] nvarchar(50) not null
,
constraint [Pk_User_UserId] primary key clustered
(
	[UserId] asc
)
);
--**********************************************************************
--	Data
--**********************************************************************
--**********************************************************************
--	Relationships
--**********************************************************************
GO
