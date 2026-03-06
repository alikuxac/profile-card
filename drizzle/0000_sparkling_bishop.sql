CREATE TABLE `donates` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`account_name` text NOT NULL,
	`account_number` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `link_groups` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `links` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`icon` text,
	`color` text,
	`order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`group_id`) REFERENCES `link_groups`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`url` text,
	`github_url` text,
	`cover_image` text,
	`order` integer DEFAULT 0 NOT NULL
);
