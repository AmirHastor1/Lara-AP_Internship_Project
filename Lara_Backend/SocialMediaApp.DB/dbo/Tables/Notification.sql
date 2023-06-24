-- Table dbo.Notification
-- Table dbo.Notification
create table
	[dbo].[Notification]
(
	[UserId] uniqueidentifier not null
	, [NotificationDate] datetime2(7) not null
	, [NotificationText] nvarchar(max) not null
	, [NotificationSeen] bit not null
);
GO
-- Relationship Fk_User_Notification_UserId
-- Relationship Fk_User_Notification_UserId
alter table [dbo].[Notification]
add constraint [Fk_User_Notification_UserId] foreign key ([UserId]) references [dbo].[User] ([UserId]);