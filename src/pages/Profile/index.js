import React, { useEffect, useState, Fragment } from "react";
import Header from "../../components/Header";
import { Calendar, momentLocalizer } from "react-big-calendar";
import http from "../../helper/http-client";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Loading from "../../components/Loading";
import AchievementImages from "../../helper/images";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import EmailNotify from "../../helper/emailjs";
import HandleAchievement from "../../helper/achievements";
import AchievementItemComponent from "../../components/Profile/AchievementItem";
import authService from "../../services/auth.service";

const Profile = () => {
  
  return (
    <div className="relative sm:pb-24 bg-indigo-50 text-gray-900 dark:text-gray-900 dark:bg-gray-800">
      <Header current={4} />
      <div className="p-8">
        

        {/* <div className="flex md:flex-row flex-col border border-gray-200 bg-white p-4 mb-4 rounded-md">
          <div className="w-full md:w-4/12 flex flex-col space-y-4 rounded-xl py-8 sm:py-4">
            <div className="flex justify-center items-center">
              {user.avatar === "" ? (
                <img
                  src="https://www.f-cdn.com/assets/main/en/assets/unknown.png?image-optimizer=force&format=webply&width=336 1x"
                  className="rounded-md w-44 h-44 lg:w-72 lg:h-72 sm:w-44 sm:h-44"
                  alt="user-avatar"
                />
              ) : (
                <img
                  src={user.avatar}
                  className="rounded-md w-44 h-44 lg:w-72 lg:h-72 sm:w-44 sm:h-44"
                  alt="user-avatar"
                />
              )}
            </div>
            <div className="text-center font-bold lg:text-4xl sm:text-2xl md:text-3xl">
              {user.username}
            </div>
          </div>
          <div className="w-full md:w-8/12 text-left p-4">
            {isLoading ? (
              <Loading />
            ) : (
              result && (
                <div className="px-4">
                  <div className="sm:flex sm:flex-wrap gap-4">
                    <AchievementItemComponent
                      result={result.sentTotalChallengeNo}
                      title="Friendly Challenger"
                      type="season"
                      max={100}
                      iconSize="w-16 h-12"
                      achievementIcons={AchievementImages.FRIENDLY_CHALLENGER}
                      handleActive={HandleAchievement.friendlyActive}
                    />
                    <AchievementItemComponent
                      result={result.maxVictoryStreak}
                      title="Victory Streak"
                      type="both"
                      max={10}
                      iconSize="w-16 h-12"
                      achievementIcons={AchievementImages.STREAK}
                      handleActive={HandleAchievement.streakActive}
                    />
                    <AchievementItemComponent
                      result={result.master26}
                      title="Breakfast"
                      type="season"
                      max={1000}
                      iconSize="w-16 h-12"
                      achievementIcons={AchievementImages.BREAKFAST}
                      handleActive={HandleAchievement.breakfastActive}
                    />
                  </div>

                  <div className="flex flex-wrap justify-center mt-8 max-h-40 sm:max-h-full sm:overflow-y-none overflow-y-auto">
                    {AchievementImages.FINISHINGACE.map((val, index) =>
                      achievement.finishing.includes(index) ? (
                        <div
                          className="sm:flex sm:items-center sm:w-20 w-[33.3%]"
                          key={index}
                        >
                          <img
                            src={val}
                            className="sm:w-20 sm:h-20 w-full"
                            alt="achievement-icon"
                          />
                        </div>
                      ) : (
                        <div
                          className="sm:flex sm:items-center sm:w-20 w-[33.3%]"
                          key={index}
                        >
                          <img
                            src={val}
                            className="opacity-50 sm:w-20 sm:h-20 w-full"
                            alt="achievement-icon"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          events && (
            <div className="p-8 bg-white mt-8 rounded-md">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleCalendar}
                style={{ height: 500 }}
              />
            </div>
          )
        )}

        {currentSchedule && (
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Scheduled Fight
                      </Dialog.Title>
                      <p>
                        Challenge - {currentSchedule.challenger} :{" "}
                        {currentSchedule.receiver}{" "}
                      </p>
                      <p>
                        Time:
                        {new Date(currentSchedule.date).toLocaleString(
                          "en-US",
                          {
                            timeZone: getCurrentTimeZone(),
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
                      </p>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:bg-green-400"
                          onClick={onClick}
                          disabled={user.username === currentSchedule.receiver}
                        >
                          Create
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:bg-green-400"
                          onClick={onDecline}
                          disabled={
                            user.username === currentSchedule.challenger
                          }
                        >
                          Decline
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        )} */}
      </div>
    </div>
  );
};

export default Profile;
