-- Table dbo.Notification
create table
	[dbo].[Notification]
(
	[NotificationId] uniqueidentifier not null
	, [UserId] uniqueidentifier not null
	, [NotificationDate] datetime2(7) not null
	, [NotificationText] nvarchar(max) not null
	, [NotificationSeen] bit not null
,
constraint [Pk_Notification_NotificationId] primary key clustered
(
	[NotificationId] asc
)
);
GO
-- Relationship Fk_User_Notification_UserId
alter table [dbo].[Notification]
add constraint [Fk_User_Notification_UserId] foreign key ([UserId]) references [dbo].[User] ([UserId]);