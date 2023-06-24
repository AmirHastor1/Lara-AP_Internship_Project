-- Model New Model
-- Updated 2/17/2012 7:00:00 AM
-- DDL Generated 6/13/2023 3:54:41 PM

--**********************************************************************
--	Tables
--**********************************************************************

-- Table dbo.User
-- Model New Model
-- Updated 6/23/2023 3:32:04 PM
-- DDL Generated 6/23/2023 4:12:09 PM

--**********************************************************************
--	Tables
--**********************************************************************

-- Table dbo.User
-- Model New Model
-- Updated 6/24/2023 1:04:53 AM
-- DDL Generated 6/24/2023 1:04:55 AM

--**********************************************************************
--	Tables
--**********************************************************************

-- Table dbo.User
create table
	[dbo].[User]
(
	[UserId] uniqueidentifier not null
	, [Username] nvarchar(50) not null
	, [Email] nvarchar(50) not null
	, [PasswordHash] varbinary(max) not null
	, [PasswordSalt] varbinary(max) not null
	, [Jwt] nvarchar(max) null
	, [Expiry] datetime2(7) null
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
