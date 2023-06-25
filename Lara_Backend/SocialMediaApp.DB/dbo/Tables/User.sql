-- Table dbo.User
create table
	[dbo].[User]
(
	[UserId] uniqueidentifier not null
	, [Username] nvarchar(50) not null
	, [Email] nvarchar(50) not null
	, [ProfilePicture] image null
	, [PasswordHash] varbinary(max) not null
	, [PasswordSalt] varbinary(max) not null
	, [Jwt] nvarchar(max) null
	, [Expiry] datetime2(7) null
	, [DarkTheme] bit null
	, [NotificationsOn] bit null
,
constraint [Pk_User_UserId] primary key clustered
(
	[UserId] asc
)
);